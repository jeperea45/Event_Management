import React, { useState } from 'react';
import { Mail, Lock, UserPlus, LogIn } from 'lucide-react';

interface AuthFormsProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (email: string, password: string) => Promise<void>;
}

export function AuthForms({ onLogin, onRegister }: AuthFormsProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (isLoginMode) {
      onLogin(email, password)
      .then(() => {
        setMessage(`¡Bienvenido, ${email}!`); 
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || 'Error al iniciar sesión.';
        setMessage(errorMessage)});
    } else {
      onRegister(email, password)
      .then(() => {
        setMessage('¡Correo registrado correctamente!');
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || 'Error al registrar usuario.';
        setMessage(errorMessage);
      });
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLoginMode ? 'Login' : 'Register'}
      </h2>
      {message && (
        <div
          className={`text-center mb-4 ${
            message.includes('correctamente') || message.includes('Bienvenido')
              ? 'text-green-500'
              : 'text-red-500'
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isLoginMode ? (
            <>
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              <span>Register</span>
            </>
          )}
        </button>
      </form>
      <button
        onClick={() => {
          setIsLoginMode(!isLoginMode);
          setMessage(null);
        }}
        className="w-full text-center mt-4 text-blue-600 hover:text-blue-700"
      >
        {isLoginMode ? "Don't have an account? Register" : 'Already have an account? Login'}
      </button>
    </div>
  );
}
