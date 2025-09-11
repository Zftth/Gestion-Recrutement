import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar'; // Ajustez ce chemin selon votre structure

const BlogPage = () => {
  const [email, setEmail] = useState('');

  // Articles avec de vrais liens existants et images personnalisées
  const blogPosts = [
    {
      id: 1,
      title: "5 conseils pour optimiser vos candidatures en 2024",
      subtitle: "Les dynamiques changent, découvrez comment vous distinguer de la concurrence pour décrocher l'emploi de vos rêves.",
      date: "Décembre 2024",
      category: "Emplois",
      image: "/public/h1_hero.jpg",
      link: "https://workandyou.fr/recrutement/5-conseils-pour-optimiser-vos-candidatures-en-2024/"
    },
    {
      id: 2,
      title: "7 conseils pour avoir un meilleur CV et booster son employabilité",
      subtitle: "Découvrez les stratégies efficaces pour améliorer votre CV et augmenter vos chances de décrocher un entretien en 2025.",
      date: "Décembre 2024",
      category: "Emplois",
      image: "/public/cv_bg.jpg",
      link: "https://www.welcometothejungle.com/fr/articles/meilleur-cv-conseils-booster-son-employabilite"
    },
    {
      id: 3,
      title: "Des entretiens d'embauche 100% réussis !",
      subtitle: "Un recrutement est souvent ponctué de plusieurs entretiens. Voici nos conseils pour bien appréhender chaque étape.",
      date: "Février 2024",
      category: "Emplois",
      image: "/public/about.jpg",
      link: "https://www.francetravail.fr/candidat/vos-recherches/preparer-votre-candidature/entretien/des-entretiens-dembauche-100---r.html"
    },
    {
      id: 4,
      title: "Comment mener et réussir un entretien d'embauche en 2025",
      subtitle: "Comment préparer, mener et conclure un entretien d'embauche ? Découvrez les 5 grandes étapes de l'entretien efficace.",
      date: "Juin 2025",
      category: "Emplois",
      image: "/public/home-blog2.jpg",
      link: "https://culture-rh.com/comment-mener-entretien-embauche/"
    }
  ];

  const handleNewsletterSubmit = () => {
    if (email) {
      alert(`Inscription réussie avec l'email: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Utilisation de votre Navbar */}
      <Navbar />

      {/* Hero Section Blog */}
      <section
        className="relative bg-cover bg-center flex items-center pt-24 md:pt-32 h-[400px]"
        style={{ backgroundImage: "url('/images/h1_hero.jpg')" }}
        aria-label="Section blog"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 md:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-snug mb-4">
            Notre Blog
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Découvrez nos conseils, astuces et actualités pour réussir votre recherche d'emploi et booster votre carrière
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Featured Article */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-lg group">
              <img 
                src={blogPosts[0].image}
                alt="Optimiser candidatures 2024"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                {blogPosts[0].category}
              </span>
            </div>
            
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                {blogPosts[0].date}
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-blue-600 transition-colors">
                {blogPosts[0].title}
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {blogPosts[0].subtitle}
              </p>
              
              <a 
                href={blogPosts[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Lire l'article
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          {/* Secondary Article */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-lg group">
              <img 
                src={blogPosts[1].image}
                alt="Conseils CV employabilité"
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                {blogPosts[1].category}
              </span>
            </div>
            
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                {blogPosts[1].date}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors">
                {blogPosts[1].title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {blogPosts[1].subtitle}
              </p>
              
              <a 
                href={blogPosts[1].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Lire l'article
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Other Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Third Article */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="relative overflow-hidden group">
              <img 
                src={blogPosts[2].image}
                alt="Réussir entretiens embauche"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                {blogPosts[2].category}
              </span>
            </div>
            
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                {blogPosts[2].date}
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors">
                {blogPosts[2].title}
              </h4>
              
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {blogPosts[2].subtitle}
              </p>
              
              <a 
                href={blogPosts[2].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Lire l'article
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          {/* Fourth Article */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="relative overflow-hidden group">
              <img 
                src={blogPosts[3].image}
                alt="Mener entretien embauche 2025"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                {blogPosts[3].category}
              </span>
            </div>
            
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                {blogPosts[3].date}
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors">
                {blogPosts[3].title}
              </h4>
              
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                {blogPosts[3].subtitle}
              </p>
              
              <a 
                href={blogPosts[3].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Lire l'article
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Restez informé de nos derniers articles
          </h3>
          <p className="text-gray-600 mb-6">
            Recevez directement dans votre boîte mail nos conseils carrière et opportunités d'emploi
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleNewsletterSubmit}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">RecrutPro</h3>
              <p className="mb-4">La plateforme de recrutement la plus simple et efficace pour trouver votre prochain emploi.</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li><a href="/Accueil" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="/blogs" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Légal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
                <li><a href="/cookies" className="hover:text-white transition-colors">Politique des cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic">
                <p className="mb-2">Lomé, Togo</p>
                <p className="mb-2">awidelphine6@gmail.com</p>
                <p>+228 70 26 51 34</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center">
            <p>© {new Date().getFullYear()} RecrutPro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
        aria-label="Retour en haut"
      >
        <ArrowRight className="w-5 h-5 transform -rotate-90" />
      </button>
    </div>
  );
};

export default BlogPage;