import { Link, Outlet } from "react-router-dom";

export default function Navbar() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/homepage";
  };

  return (
    <>
    <header className="bg-white shadow-xl/30 p-4 flex justify-between items-center">
      <div className="container mx-auto flex justify-between items-center  px-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-auto"
          />
          <span className="font-bold text-2xl text-blue-600">RecrutApp</span>
        </Link>

        {/* Liens */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors">Maison</Link>
          <Link to="/jobs" className="hover:text-blue-600 transition-colors">Trouver un emploi</Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">À propos</Link>
          <Link to="/blogs" className="hover:text-blue-600 transition-colors">Blogs</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
        </nav>

        {/* Bouton Déconnexion */}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded text-white font-medium hover:bg-red-600 transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </header>
    <main className="flex overflow-y-auto">
    </main>
    </>
  );
}
