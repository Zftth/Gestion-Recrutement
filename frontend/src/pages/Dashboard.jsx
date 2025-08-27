import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  if (!user) return <p className="p-4">Chargement...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Bienvenue, {user.name}</h1>
      <p className="text-gray-600 mb-6">Rôle : {user.role}</p>

      {user.role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-100 rounded-lg shadow">📊 Statistiques globales</div>
          <div className="p-4 bg-green-100 rounded-lg shadow">👥 Gestion des utilisateurs</div>
          <div className="p-4 bg-yellow-100 rounded-lg shadow">📝 Offres d'emploi</div>
        </div>
      )}

      {user.role === "recruteur" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-purple-100 rounded-lg shadow">📌 Mes offres</div>
          <div className="p-4 bg-pink-100 rounded-lg shadow">📥 Candidatures reçues</div>
        </div>
      )}

      {user.role === "candidat" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-100 rounded-lg shadow">📄 Mes candidatures</div>
          <div className="p-4 bg-orange-100 rounded-lg shadow">📅 Mes entretiens</div>
        </div>
      )}
    </div>
  );
}
