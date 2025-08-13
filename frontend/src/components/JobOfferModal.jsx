"use client"

/**
 * Modal pour créer/modifier une offre d'emploi
 * Utilisé par les administrateurs et recruteurs
 */
import { useState, useEffect } from "react"
import { X, MapPin, DollarSign } from "lucide-react"
import Button from "./Button"
import FormInput from "./FormInput"
import toast from "react-hot-toast"

const JobOfferModal = ({ isOpen, onClose, onSubmit, offer = null, loading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    contract_type: "CDI",
    salary_min: "",
    salary_max: "",
    experience_level: "junior",
    status: "active",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title || "",
        description: offer.description || "",
        requirements: offer.requirements || "",
        location: offer.location || "",
        contract_type: offer.contract_type || "CDI",
        salary_min: offer.salary_min || "",
        salary_max: offer.salary_max || "",
        experience_level: offer.experience_level || "junior",
        status: offer.status || "active",
      })
    } else {
      setFormData({
        title: "",
        description: "",
        requirements: "",
        location: "",
        contract_type: "CDI",
        salary_min: "",
        salary_max: "",
        experience_level: "junior",
        status: "active",
      })
    }
    setErrors({})
  }, [offer, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = "Le titre est requis"
    if (!formData.description.trim()) newErrors.description = "La description est requise"
    if (!formData.location.trim()) newErrors.location = "La localisation est requise"
    if (
      formData.salary_min &&
      formData.salary_max &&
      Number.parseInt(formData.salary_min) > Number.parseInt(formData.salary_max)
    ) {
      newErrors.salary_max = "Le salaire maximum doit être supérieur au minimum"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs du formulaire")
      return
    }

    await onSubmit(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{offer ? "Modifier l'offre" : "Nouvelle offre d'emploi"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Titre */}
          <FormInput
            label="Titre du poste"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="Ex: Développeur Full Stack"
            required
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description du poste</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Décrivez les missions et responsabilités..."
              required
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Exigences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exigences et compétences</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Listez les compétences requises..."
            />
          </div>

          {/* Localisation et Type de contrat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Localisation"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              placeholder="Ex: Paris, France"
              icon={MapPin}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type de contrat</label>
              <select
                name="contract_type"
                value={formData.contract_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Stage">Stage</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          {/* Salaire */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Salaire minimum (€)"
              name="salary_min"
              type="number"
              value={formData.salary_min}
              onChange={handleChange}
              placeholder="35000"
              icon={DollarSign}
            />

            <FormInput
              label="Salaire maximum (€)"
              name="salary_max"
              type="number"
              value={formData.salary_max}
              onChange={handleChange}
              error={errors.salary_max}
              placeholder="45000"
              icon={DollarSign}
            />
          </div>

          {/* Niveau d'expérience et Statut */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Niveau d'expérience</label>
              <select
                name="experience_level"
                value={formData.experience_level}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="junior">Junior (0-2 ans)</option>
                <option value="intermediate">Intermédiaire (2-5 ans)</option>
                <option value="senior">Senior (5+ ans)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="closed">Fermée</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" loading={loading}>
              {offer ? "Modifier" : "Créer"} l'offre
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobOfferModal
