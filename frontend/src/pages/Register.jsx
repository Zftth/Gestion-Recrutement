import { useState } from "react";
import api from "../api";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("candidat");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", {
        name,
        email,
        password,
        password_confirmation,
        role,
      });

      toast.success("Inscription réussie ! Vous pouvez vous connecter.");
      window.location.href = "/login";
    } catch (err) {
      toast.error("Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Inscription</h1>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />
      <input
        type="password"
        placeholder="Confirmer mot de passe"
        value={password_confirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      >
        <option value="admin">Admin</option>
        <option value="recruteur">Recruteur</option>
        <option value="candidat">Candidat</option>
      </select>
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        S'inscrire
      </button>
      <p className="text-center mt-4 text-sm text-gray-600">
        Déjà un compte ?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
