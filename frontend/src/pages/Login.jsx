import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      // Sauvegarder le token
      localStorage.setItem("token", res.data.token);

      // Rediriger vers Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Identifiants incorrects, réessayez.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex items-center justify-center p-4">
      {/* Effets de fond décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white bg-opacity-10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-white bg-opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-blue-300 bg-opacity-20 rounded-full blur-xl"></div>
      </div>

      {/* Conteneur principal */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Icône et titre */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Connexion</h1>
            <p className="text-gray-600">Connectez-vous à votre compte</p>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Formulaire */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Champ Email */}
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Se connecter
            </button>
          </form>

          {/* Lien d'inscription */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Pas encore de compte ?{' '}
              <button className="text-blue-500 font-medium hover:text-blue-600 transition-colors">
                S'inscrire
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
