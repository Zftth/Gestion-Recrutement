// src/pages/About.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

export default function About() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Merci de vous être abonné à notre newsletter!");
    setEmail("");
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar (identique aux autres pages) */}
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-10" />
            <span className="text-xl font-bold text-blue-700">RecrutPro</span>
          </div>
          <ul className="hidden md:flex space-x-8 font-medium">
            <li><Link to="/" className="hover:text-blue-600">Accueil</Link></li>
            <li><Link to="/about" className="text-blue-600">À propos</Link></li>
            <li><Link to="/blog" className="hover:text-blue-600">Blogs</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
          </ul>
          <div className="flex space-x-3">
            <Link to="/login" className="px-4 py-2 border rounded-md text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
              Se connecter
            </Link>
            <Link to="/register" className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">
              Registre
            </Link>
          </div>
        </div>
      </nav>

      {/* Section Pourquoi nous choisir? */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Pourquoi nous choisir?</h1>
            <p className="text-lg text-gray-600">
              Avec des années d'expérience et une connaissance approfondie du secteur, nous avons fait nos preuves et nous nous efforçons constamment de garder une longueur d'avance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center mr-4 mt-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Notre procédure d'évolution est super intelligente</h3>
                  <p className="text-gray-600">
                    Nous utilisons des technologies de pointe et des méthodologies éprouvées pour garantir des résultats optimaux.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nous offrons des services au-delà des attentes</h3>
                  <p className="text-gray-600">
                    Notre engagement envers l'excellence nous permet de dépasser constamment les attentes de nos clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section À propos de nous avec coordonnées */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* À propos de nous */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">À PROPOS DE NOUS</h2>
              <p className="text-gray-600 mb-6">
                Le ciel fructueux ne couvre pas les moindres dxsays qui apparaissent comme des saisons rampantes, alors voici.
              </p>
              <p className="text-gray-600">
                RecrutPro est bien plus qu'une plateforme de recrutement. Nous sommes des partenaires dévoués à la réussite professionnelle. Notre mission est de connecter les talents aux opportunités qui correspondent parfaitement à leurs compétences et aspirations.
              </p>
            </div>

            {/* Coordonnées */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">COORDONNÉES</h3>
              <address className="not-italic text-gray-600">
                <p className="mb-2">8014 Boulevard Edith NE, Avedji</p>
                <p className="mb-2">Lomé, Togo</p>
                <p className="mb-2">Téléphone : +228 70 26 51 34</p>
                <p>Courriel : awidelphine6@gmail.com</p>
              </address>
            </div>

            {/* Liens importants */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">LIEN IMPORTANT</h3>
              <ul className="space-y-2">
                <li><Link to="/projects" className="text-gray-600 hover:text-blue-600">Voir le projet</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contactez-nous</Link></li>
                <li><Link to="/testimonials" className="text-gray-600 hover:text-blue-600">Témoignage</Link></li>
                <li><Link to="/proposals" className="text-gray-600 hover:text-blue-600">Propositions</Link></li>
                <li><Link to="/support" className="text-gray-600 hover:text-blue-600">Soutien</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section Bulletin */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">BULLETIN</h3>
            <p className="text-gray-600 mb-6">
              Le ciel fertile ne diminue pas en jours. Apparemment rampant.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresse email" 
                className="px-4 py-3 rounded-md flex-grow text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer (identique aux autres pages) */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">À PROPOS DE NOUS</h3>
              <p className="mb-4">RecrutPro est la plateforme de recrutement leader au Togo, connectant les talents aux meilleures opportunités professionnelles.</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">COORDONNÉES</h3>
              <address className="not-italic">
                <p className="mb-2">8014 Boulevard Edith NE, Avedji</p>
                <p className="mb-2">Lomé, Togo</p>
                <p className="mb-2">awidelphine6@gmail.com</p>
                <p>+228 70 26 51 34</p>
              </address>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">LIEN IMPORTANT</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">À propos</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">BULLETIN</h3>
              <p className="mb-4">Abonnez-vous à notre newsletter pour recevoir les dernières offres d'emploi.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="px-4 py-2 rounded-l-md w-full text-gray-900"
                />
                <button className="bg-blue-700 text-white px-4 py-2 rounded-r-md hover:bg-blue-800">
                  S'abonner
                </button>
              </div>
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