const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectDB = require('./config/db');
const { PORT } = require('./utils/config');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    }}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);

process.env.TZ = 'America/Bogota'

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
