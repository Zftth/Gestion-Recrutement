import { Link } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 shadow-md">
      <h2 className="text-lg font-bold mb-6">Menu</h2>
      <ul className="space-y-3">
        <li><Link to="/dashboard" className="block p-2 rounded hover:bg-gray-200">🏠 Dashboard</Link></li>
        <li><Link to="/job-offers" className="block p-2 rounded hover:bg-gray-200">📝 Offres</Link></li>
        <li><Link to="/applications" className="block p-2 rounded hover:bg-gray-200">📥 Candidatures</Link></li>
        <li><Link to="/interviews" className="block p-2 rounded hover:bg-gray-200">📅 Entretiens</Link></li>
        <li><Link to="/documents" className="block p-2 rounded hover:bg-gray-200">📂 Documents</Link></li>

        {user?.role === "admin" && (
          <li><Link to="/users" className="block p-2 rounded hover:bg-gray-200">👥 Utilisateurs</Link></li>
        )}
      </ul>
    </aside>
  );
}
