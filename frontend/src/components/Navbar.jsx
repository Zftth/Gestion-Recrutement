import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto"
          />
          <span className="font-bold text-xl text-blue-600">RecrutApp</span>
        </Link>

        {/* Liens */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Maison</Link>
          <Link to="/jobs" className="hover:text-blue-600 transition">Trouver un emploi</Link>
          <Link to="/about" className="hover:text-blue-600 transition">À propos</Link>
          <Link to="/blogs" className="hover:text-blue-600 transition">Blogs</Link>
          <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </nav>

        {/* Boutons */}
        <div className="space-x-3">
          <Link
            to="/login"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Se connecter
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Registre
          </Link>
        </div>
      </div>
    </header>
  );
}
