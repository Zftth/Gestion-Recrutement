import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-hot-toast";

export default function Interviews() {
  const [interviews, setInterviews] = useState([]);

  const fetchInterviews = async () => {
    try {
      const res = await api.get("/interviews");
      setInterviews(res.data);
    } catch {
      toast.error("Erreur lors du chargement des entretiens");
    }
  };

  useEffect(() => { fetchInterviews(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Entretiens</h1>
      <ul>
        {interviews.map((i) => (
          <li key={i.id} className="border p-3 mb-2">
            <p><b>Candidat:</b> {i.application?.user?.name}</p>
            <p><b>Offre:</b> {i.application?.job_offer?.title}</p>
            <p><b>Date:</b> {i.date}</p>
            <p><b>Lieu:</b> {i.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
