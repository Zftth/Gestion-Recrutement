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
    <header className="bg-gray-50 shadow-xl/30 p-4 flex justify-between items-center">
      <div className="container mx-auto flex justify-between items-center  px-6">
        
       

        {/* Liens */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          
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
