"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, Mail } from "lucide-react"
import { authAPI } from "../api"
import FormInput from "../components/FormInput"
import Button from "../components/Button"
import toast from "react-hot-toast"

/**
 * Page de connexion utilisateur
 * Permet aux utilisateurs de se connecter avec email/mot de passe
 * Gère l'authentification et la redirection selon le rôle
 */
const Login = ({ setUser }) => {
  // État du formulaire avec validation en temps réel
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  /**
   * Gère les changements dans les champs du formulaire
   * Efface automatiquement les erreurs lors de la saisie
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  /**
   * Validation côté client du formulaire
   * Vérifie le format email et la longueur du mot de passe
   */
  const validateForm = () => {
    const newErrors = {}

    // Validation email avec regex RFC compliant
    if (!formData.email) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide"
    }

    // Validation mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Soumission du formulaire de connexion
   * Gère l'authentification et la redirection
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation côté client avant envoi
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire")
      return
    }

    setLoading(true)

    try {
      const response = await authAPI.login(formData)
      const { token, user } = response.data

      // Stockage sécurisé des données d'authentification
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      // Mise à jour de l'état global de l'application
      setUser(user)

      // Notification de succès personnalisée
      toast.success(`Bienvenue ${user.name}! Connexion réussie.`)

      // Redirection vers le tableau de bord
      navigate("/dashboard")
    } catch (error) {
      // Gestion d'erreurs spécifique selon le code de statut
      if (error.response?.status === 401) {
        toast.error("Email ou mot de passe incorrect")
        setErrors({
          email: "Identifiants incorrects",
          password: "Identifiants incorrects",
        })
      } else if (error.response?.status === 422) {
        // Erreurs de validation du backend
        const backendErrors = error.response.data.errors || {}
        setErrors(backendErrors)
        toast.error("Données invalides")
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Erreur de connexion, veuillez réessayer")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* En-tête de la page */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous à votre compte RecrutApp pour accéder à votre espace personnel
          </p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Adresse email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
              error={errors.email}
              icon={Mail}
              helpText="Utilisez l'email avec lequel vous vous êtes inscrit"
            />

            <FormInput
              label="Mot de passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              error={errors.password}
              helpText="Minimum 6 caractères"
            />

            {/* Bouton de soumission avec état de chargement */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
              disabled={!formData.email || !formData.password}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          {/* Lien vers l'inscription */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors underline"
              >
                Créer un compte gratuitement
              </Link>
            </p>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="text-center text-xs text-gray-500">
          <p>En vous connectant, vous acceptez nos conditions d'utilisation</p>
        </div>
      </div>
    </div>
  )
}

export default Login
