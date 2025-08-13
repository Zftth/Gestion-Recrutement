"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserPlus, Mail, User, Lock, Shield } from "lucide-react"
import { authAPI } from "../api"
import FormInput from "../components/FormInput"
import Button from "../components/Button"
import toast from "react-hot-toast"

/**
 * Page d'inscription utilisateur
 * Permet la création de nouveaux comptes avec validation complète
 * Supporte les rôles : admin, recruteur, candidat
 */
const Register = () => {
  // État du formulaire avec tous les champs requis
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "candidat", // Rôle par défaut
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  // Configuration des rôles disponibles
  const roles = [
    {
      value: "admin",
      label: "Administrateur",
      description: "Gestion complète de la plateforme",
      icon: Shield,
    },
    {
      value: "recruteur",
      label: "Recruteur",
      description: "Publication d'offres et gestion des candidatures",
      icon: UserPlus,
    },
    {
      value: "candidat",
      label: "Candidat",
      description: "Recherche d'emploi et candidatures",
      icon: User,
    },
  ]

  /**
   * Gère les changements dans les champs du formulaire
   * Validation en temps réel pour une meilleure UX
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

    if (name === "password_confirmation" && formData.password && value !== formData.password) {
      setErrors((prev) => ({
        ...prev,
        password_confirmation: "Les mots de passe ne correspondent pas",
      }))
    } else if (name === "password_confirmation" && value === formData.password) {
      setErrors((prev) => ({
        ...prev,
        password_confirmation: "",
      }))
    }
  }

  /**
   * Validation complète du formulaire côté client
   * Vérifie tous les champs avec des règles métier spécifiques
   */
  const validateForm = () => {
    const newErrors = {}

    // Validation nom complet
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères"
    } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(formData.name.trim())) {
      newErrors.name = "Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets"
    }

    // Validation email avec regex RFC compliant
    if (!formData.email) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide"
    }

    // Validation mot de passe avec critères de sécurité
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre"
    }

    // Validation confirmation mot de passe
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "La confirmation du mot de passe est requise"
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Les mots de passe ne correspondent pas"
    }

    // Validation rôle
    if (!formData.role) {
      newErrors.role = "Le rôle est requis"
    } else if (!roles.some((role) => role.value === formData.role)) {
      newErrors.role = "Rôle invalide"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Soumission du formulaire d'inscription
   * Gère la création de compte et la redirection
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
      await authAPI.register({
        ...formData,
        name: formData.name.trim(), // Nettoyage des espaces
      })

      toast.success("Compte créé avec succès! Vous pouvez maintenant vous connecter.")
      navigate("/login")
    } catch (error) {
      // Gestion d'erreurs spécifique selon le type
      if (error.response?.status === 422) {
        // Erreurs de validation du backend Laravel
        const backendErrors = error.response.data.errors || {}
        setErrors(backendErrors)
        toast.error("Veuillez corriger les erreurs dans le formulaire")
      } else if (error.response?.status === 409) {
        // Conflit (email déjà utilisé)
        setErrors({ email: "Cette adresse email est déjà utilisée" })
        toast.error("Cette adresse email est déjà utilisée")
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Erreur lors de la création du compte, veuillez réessayer")
      }
    } finally {
      setLoading(false)
    }
  }

  // Calcul de la force du mot de passe pour l'affichage
  const getPasswordStrength = () => {
    const password = formData.password
    if (!password) return { strength: 0, label: "" }

    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++

    const labels = ["", "Très faible", "Faible", "Moyen", "Fort", "Très fort"]
    const colors = ["", "text-red-500", "text-orange-500", "text-yellow-500", "text-green-500", "text-green-600"]

    return { strength, label: labels[strength], color: colors[strength] }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* En-tête de la page */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Créer un compte</h2>
          <p className="mt-2 text-sm text-gray-600">
            Rejoignez RecrutApp et accédez à des milliers d'opportunités d'emploi
          </p>
        </div>

        {/* Formulaire d'inscription */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Nom complet"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jean Dupont"
              required
              error={errors.name}
              icon={User}
              helpText="Votre nom et prénom"
            />

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
              helpText="Utilisée pour la connexion et les notifications"
            />

            {/* Sélecteur de rôle amélioré */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Rôle <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="space-y-2">
                {roles.map((role) => {
                  const IconComponent = role.icon
                  return (
                    <label
                      key={role.value}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.role === role.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <IconComponent className="w-5 h-5 text-gray-600 mr-3" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{role.label}</div>
                        <div className="text-sm text-gray-500">{role.description}</div>
                      </div>
                    </label>
                  )
                })}
              </div>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>

            <FormInput
              label="Mot de passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              error={errors.password}
              icon={Lock}
              helpText={
                formData.password && <span className={passwordStrength.color}>Force: {passwordStrength.label}</span>
              }
            />

            <FormInput
              label="Confirmer le mot de passe"
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="••••••••"
              required
              error={errors.password_confirmation}
              icon={Lock}
              helpText="Ressaisissez votre mot de passe"
            />

            {/* Bouton de soumission avec validation */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
              disabled={
                Object.keys(errors).length > 0 ||
                !formData.name ||
                !formData.email ||
                !formData.password ||
                !formData.password_confirmation
              }
            >
              {loading ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </form>

          {/* Lien vers la connexion */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Déjà un compte?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>

        {/* Informations légales */}
        <div className="text-center text-xs text-gray-500">
          <p>En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de confidentialité</p>
        </div>
      </div>
    </div>
  )
}

export default Register
