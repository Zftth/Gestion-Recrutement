// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [jobOffers, setJobOffers] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    useEffect(() => {
      const fetchOffers = async () => {
        try {
          const res = await fetch("http://localhost:8000/api/jobs-offers", {
            headers: {
              "Content-Type": "application/json",
            }
          });
          const data = await res.json();
          setJobOffers(data);
        } catch (err) {
          console.error("Erreur récupération offres:", err);
        } 
      };
      fetchOffers();
    }, []);

  // Données fictives pour les catégories d'emplois
  const jobCategories = [
    { id: 1, name: "Développement Web", count: 234, icon: "💻" },
    { id: 2, name: "Design Graphique", count: 156, icon: "🎨" },
    { id: 3, name: "Marketing Digital", count: 198, icon: "📊" },
    { id: 4, name: "Ressources Humaines", count: 122, icon: "👥" },
    { id: 5, name: "Finance & Comptabilité", count: 178, icon: "💰" },
    { id: 6, name: "Service Client", count: 145, icon: "🤝" },
  ];

  
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav 
        className={`bg-white fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "shadow-md py-2" : "shadow-sm py-4"
        }`}
        aria-label="Navigation principale"
      >
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded">
            <img 
              src="/logo.png" 
              alt="Logo RecrutPro" 
              className="h-8 md:h-10" 
              width="40"
              height="40"
            />
            <span className="text-xl font-bold text-blue-700">RecrutPro</span>
          </Link>
          
          {/* Menu mobile */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Ouvrir le menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8 font-medium">
              <li><Link to="/" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1">Accueil</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1">À propos</Link></li>
              <li><Link to="/blogs" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1">Blogs</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2 py-1">Contact</Link></li>
            </ul>
            <div className="flex space-x-3">
              <Link to="/login" className="px-4 py-2 border rounded-md text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600">
                Se connecter
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600">
                Registre
              </Link>
            </div>
          </div>
        </div>

        {/* Menu mobile ouvert */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg px-4 py-4">
            <ul className="space-y-3 font-medium">
              <li><Link to="/" className="block py-2 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2" onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
              <li><Link to="/about" className="block py-2 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2" onClick={() => setIsMenuOpen(false)}>À propos</Link></li>
              <li><Link to="/blogs" className="block py-2 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2" onClick={() => setIsMenuOpen(false)}>Blogs</Link></li>
              <li><Link to="/contact" className="block py-2 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-2" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            </ul>
            <div className="flex flex-col space-y-3 mt-4">
              <Link to="/login" className="px-4 py-2 border rounded-md text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600" onClick={() => setIsMenuOpen(false)}>
                Se connecter
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600" onClick={() => setIsMenuOpen(false)}>
                Registre
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center flex items-center pt-24 md:pt-32 h-[600px]"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-label="Section principale"
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4 md:px-12 relative z-10">
          {/* Texte */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mt-10 text-white leading-snug">
              Que votre <br /> histoire de carrière <br /> commence ici
            </h1>
            <p className="mt-4 text-lg text-white">
              Trouvez l'emploi idéal, postulez en ligne et commencez une nouvelle aventure professionnelle.
            </p>
            <Link
              to="/jobs"
              className="mt-6 inline-block px-6 py-3 bg-blue-700 text-white text-lg font-semibold rounded-md hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Commencez maintenant
            </Link>
          </div>
        </div>
      </section>

      {/* Section Catégories d'emplois en vedette */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-12">
          <div className="text-center mb-4">
            <span className="text-blue-600 font-semibold">CATÉGORIES D'EMPLOIS EN VEDETTE</span>
          </div>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Parcourir les principales catégories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {jobCategories.map((category) => (
              <div key={category.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{category.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-gray-600">{category.count} offres disponibles</p>
                  </div>
                </div>
                <Link 
                  to={`/jobs?category=${category.name}`}
                  className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
                >
                  Voir les offres
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              to="/jobs" 
              className="px-6 py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 inline-flex items-center transition-colors"
            >
              PARCOURIR TOUS LES EMPLOIS
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Emploi récent (déplacée avant Comment ça marche) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">EMPLOI RÉCENT</h2>
          <h3 className="text-xl text-center mb-12 text-gray-600">Offres d'emploi en vedette</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {jobOffers.map((offer) => (
              <div key={offer.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-blue-600 font-medium">{offer.company}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600">{offer.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">{offer.type}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">{offer.salary}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{offer.posted}</span>
                  <Link 
                    to={`/jobs/${offer.id}`}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Postuler
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              to="/jobs" 
              className="px-6 py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 inline-flex items-center transition-colors"
            >
              PARCOURIR TOUS LES EMPLOIS
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Comment ça marche (après Emploi récent) */}
      <section className="bg-blue-900 text-white py-16" aria-label="Comment ça marche">
        <div className="container mx-auto px-4 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comment ça marche
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-10 text-center">
            {/* Étape 1 */}
            <div className="p-6 bg-blue-800 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
              <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
              <h3 className="text-xl font-semibold mb-2">1. Rechercher un emploi</h3>
              <p className="text-gray-200">
                Explorez les offres disponibles adaptées à vos compétences et objectifs.
              </p>
            </div>

            {/* Étape 2 */}
            <div className="p-6 bg-blue-800 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
              <div className="text-5xl mb-4" aria-hidden="true">📄</div>
              <h3 className="text-xl font-semibold mb-2">2. Postuler à un emploi</h3>
              <p className="text-gray-200">
                Soumettez votre candidature directement via notre plateforme.
              </p>
            </div>

            {/* Étape 3 */}
            <div className="p-6 bg-blue-800 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
              <div className="text-5xl mb-4" aria-hidden="true">💼</div>
              <h3 className="text-xl font-semibold mb-2">3. Obtenez votre emploi</h3>
              <p className="text-gray-200">
                Recevez des notifications et démarrez une nouvelle carrière.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nouvelle section statistiques/témoignages */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Ils nous font confiance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-700">10K+</p>
              <p className="text-gray-600">Utilisateurs actifs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-700">5K+</p>
              <p className="text-gray-600">Offres d'emploi</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-700">95%</p>
              <p className="text-gray-600">Satisfaction clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-700">2K+</p>
              <p className="text-gray-600">Entreprises</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer avec informations de contact mises à jour */}
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
                <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">À propos</Link></li>
                <li><Link to="/blogs" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Légal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">Politique des cookies</Link></li>
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
    </div>
  );
}