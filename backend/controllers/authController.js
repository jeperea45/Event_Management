const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/hashUtils');
const { generateToken } = require('../utils/jwtUtils');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
        console.error('Error de registro', error)
        res.status(500).json({ message: 'Error al registrar usuario.', error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        
        const userData = {
            id: user._id,
            email: user.email
        };

        res.status(200).json({ 
            message: 'Inicio de sesión exitoso.',
            user: userData 
        });
   } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión.', error });
   }
};

const logout = async(req,res) => {
    try{
        res.clearCookie('token');
        res.status(200).json({ message: 'Sesión cerrada con éxito.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cerrar sesión.', error });
    }
};

const profile = async(req,res) => {
    try {
        const user = req.user;
        const userData = await User.findById(user.id).select('-password');
        res.status(200).json({ user: userData });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener perfil.', error });
    }
};

module.exports = { register, login , profile, logout};
