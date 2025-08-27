import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-hot-toast";

export default function Documents() {
  const [docs, setDocs] = useState([]);
  const [file, setFile] = useState(null);

  const fetchDocs = async () => {
    try {
      const res = await api.get("/documents");
      setDocs(res.data);
    } catch {
      toast.error("Erreur lors du chargement des documents");
    }
  };

  const uploadDoc = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Choisissez un fichier !");
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Document uploadé !");
      setFile(null);
      fetchDocs();
    } catch {
      toast.error("Erreur upload");
    }
  };

  useEffect(() => { fetchDocs(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Documents</h1>

      <form onSubmit={uploadDoc} className="mb-6">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-2"
        />
        <button className="bg-green-600 text-white px-3 py-2 rounded">
          Upload
        </button>
      </form>

      <ul>
        {docs.map((d) => (
          <li key={d.id} className="border p-3 mb-2">
            <a
              href={`http://127.0.0.1:8000/storage/${d.path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {d.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
