// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-10" />
            <span className="text-xl font-bold text-blue-700">RecrutApp</span>
          </div>
          <ul className="hidden md:flex space-x-8 font-medium">
            <li><Link to="/" className="hover:text-blue-600">Maison</Link></li>
            <li><Link to="/jobs" className="hover:text-blue-600">Trouver un emploi</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">À propos</Link></li>
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

      {/* Hero Section */}
      <section className="pt-24 bg-gray-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12">
          {/* Texte */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 leading-snug">
              Que votre <br /> histoire de carrière <br /> commence ici
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Trouvez l’emploi idéal, postulez en ligne et commencez une nouvelle aventure professionnelle.
            </p>
            <Link
              to="/jobs"
              className="mt-6 inline-block px-6 py-3 bg-blue-700 text-white text-lg font-semibold rounded-md hover:bg-blue-800"
            >
              Commencez maintenant
            </Link>
          </div>

          {/* Image */}
          <div className="flex-1 mt-10 md:mt-0">
            <img
              src="/hero-image.jpg"
              alt="Carrière"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Section Comment ça marche */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comment ça marche
          </h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {/* Étape 1 */}
            <div className="p-6 bg-blue-800 rounded-lg shadow-lg hover:scale-105 transform transition">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">1. Rechercher un emploi</h3>
              <p className="text-gray-200">
                Explorez les offres disponibles adaptées à vos compétences et objectifs.
              </p>
            </div>

            {/* Étape 2 */}
            <div className="p-6 bg-blue-800 rounded-lg shadow-lg hover:scale-105 transform transition">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-xl font-semibold mb-2">2. Postuler à un emploi</h3>
              <p className="text-gray-200">
                Soumettez votre candidature directement via notre plateforme.
              </p>
            </div>

            {/* Étape 3 */}
            <div className="p-6 bg-blue-800 rounded-lg shadow-lg hover:scale-105 transform transition">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">3. Obtenez votre emploi</h3>
              <p className="text-gray-200">
                Recevez des notifications et démarrez une nouvelle carrière.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} RecrutApp. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
