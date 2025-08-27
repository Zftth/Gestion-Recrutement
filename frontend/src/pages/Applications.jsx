import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-hot-toast";

export default function Applications() {
  const [apps, setApps] = useState([]);

  const fetchApps = async () => {
    try {
      const res = await api.get("/applications");
      setApps(res.data);
    } catch {
      toast.error("Erreur lors du chargement des candidatures");
    }
  };

  useEffect(() => { fetchApps(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Candidatures</h1>
      <ul>
        {apps.map((a) => (
          <li key={a.id} className="border p-3 mb-2">
            <p><b>Nom:</b> {a.user?.name}</p>
            <p><b>Offre:</b> {a.job_offer?.title}</p>
            <p><b>Status:</b> {a.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
