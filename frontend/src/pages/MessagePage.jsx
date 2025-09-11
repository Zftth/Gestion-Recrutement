import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, Search, Plus, Mail } from 'lucide-react';

const MessagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    const elements = document.querySelectorAll('.animate-in');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.transition = 'all 0.6s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleNewMessage = () => {
    alert('Fonction de nouveau message à implémenter');
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleGoBack}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            💬
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <span className="text-sm text-gray-500">RecrutPro</span>
          </div>
        </div>
        <button 
          onClick={handleNewMessage}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
        >
          <Plus size={18} />
          Nouveau message
        </button>
      </div>

      <div className="flex h-[calc(100vh-81px)]">
        {/* Sidebar */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* Conversations Header */}
          <div className="animate-in bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 m-4 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle size={24} />
                <h2 className="text-xl font-bold">Conversations</h2>
              </div>
              <div className="text-sm opacity-90">0 conversation(s)</div>
            </div>
          </div>
          
          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder={isSearchFocused ? 'Tapez pour rechercher...' : 'Rechercher une conversation...'}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-3 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>
          
          {/* Conversations List */}
          <div className="flex-1 px-4 pb-4 overflow-y-auto">
            <div className="animate-in flex flex-col items-center justify-center h-full text-center p-10">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-4xl">
                💭
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune conversation</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Vos conversations avec les candidats apparaîtront ici une fois que vous commencerez à échanger.
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white flex flex-col">
          <div className="animate-in flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-center p-16">
            <div className="w-30 h-30 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-8 text-white shadow-2xl shadow-indigo-500/20">
              <Mail size={48} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Bienvenue dans vos Messages
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Communiquez facilement avec vos candidats. Sélectionnez une conversation existante ou créez un nouveau message pour commencer.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 0;
          transform: translateY(20px);
        }
      `}</style>
    </div>
  );
};

export default MessagesPage;