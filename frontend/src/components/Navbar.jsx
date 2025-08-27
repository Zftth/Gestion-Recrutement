import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">RecruitPro</h1>

      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        {user?.role === "admin" && <Link to="/users" className="hover:text-blue-400">Utilisateurs</Link>}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
