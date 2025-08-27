import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-hot-toast";

export default function JobOffers() {
  const [offers, setOffers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchOffers = async () => {
    try {
      const res = await api.get("/job-offers");
      setOffers(res.data);
    } catch {
      toast.error("Erreur lors du chargement des offres");
    }
  };

  const createOffer = async (e) => {
    e.preventDefault();
    try {
      await api.post("/job-offers", { title, description });
      toast.success("Offre créée !");
      setTitle(""); setDescription("");
      fetchOffers();
    } catch {
      toast.error("Erreur lors de la création");
    }
  };

  const deleteOffer = async (id) => {
    try {
      await api.delete(`/job-offers/${id}`);
      toast.success("Offre supprimée !");
      fetchOffers();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  useEffect(() => { fetchOffers(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Offres d'emploi</h1>

      <form onSubmit={createOffer} className="mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
          className="border p-2 mr-2 rounded"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 mr-2 rounded"
        />
        <button className="bg-blue-600 text-white px-3 py-2 rounded">
          Ajouter
        </button>
      </form>

      <ul>
        {offers.map((o) => (
          <li key={o.id} className="border p-3 mb-2 flex justify-between items-center">
            <div>
              <h2 className="font-bold">{o.title}</h2>
              <p>{o.description}</p>
            </div>
            <button
              onClick={() => deleteOffer(o.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
