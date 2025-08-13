"use client"

/**
 * Modal pour créer/modifier un entretien
 * Utilisé par les administrateurs et recruteurs
 */
import { useState, useEffect } from "react"
import { X, Calendar, Clock, MapPin, Video, Phone } from "lucide-react"
import Button from "./Button"
import FormInput from "./FormInput"
import toast from "react-hot-toast"

const InterviewModal = ({ isOpen, onClose, onSubmit, interview = null, applications = [], loading = false }) => {
  const [formData, setFormData] = useState({
    application_id: "",
    date: "",
    time: "",
    type: "presentiel",
    location: "",
    notes: "",
    status: "planifie",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (interview) {
      const interviewDate = new Date(interview.scheduled_at)
      setFormData({
        application_id: interview.application_id || "",
        date: interviewDate.toISOString().split("T")[0],
        time: interviewDate.toTimeString().slice(0, 5),
        type: interview.type || "presentiel",
        location: interview.location || "",
        notes: interview.notes || "",
        status: interview.status || "planifie",
      })
    } else {
      setFormData({
        application_id: "",
        date: "",
        time: "",
        type: "presentiel",
        location: "",
        notes: "",
        status: "planifie",
      })
    }
    setErrors({})
  }, [interview, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.application_id) newErrors.application_id = "Veuillez sélectionner une candidature"
    if (!formData.date) newErrors.date = "La date est requise"
    if (!formData.time) newErrors.time = "L'heure est requise"
    if (formData.type === "presentiel" && !formData.location.trim()) {
      newErrors.location = "Le lieu est requis pour un entretien en présentiel"
    }
    if (formData.type === "visio" && !formData.location.trim()) {
      newErrors.location = "Le lien de visioconférence est requis"
    }

    // Vérifier que la date n'est pas dans le passé
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`)
    if (selectedDateTime < new Date()) {
      newErrors.date = "La date et l'heure ne peuvent pas être dans le passé"
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

    const interviewData = {
      ...formData,
      scheduled_at: `${formData.date}T${formData.time}:00`,
    }

    await onSubmit(interviewData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "visio":
        return Video
      case "telephone":
        return Phone
      default:
        return MapPin
    }
  }

  const getLocationPlaceholder = (type) => {
    switch (type) {
      case "visio":
        return "https://meet.google.com/xxx-xxxx-xxx"
      case "telephone":
        return "Numéro de téléphone"
      default:
        return "Adresse du lieu de rendez-vous"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {interview ? "Modifier l'entretien" : "Planifier un entretien"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Candidature */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Candidature <span className="text-red-500">*</span>
            </label>
            <select
              name="application_id"
              value={formData.application_id}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.application_id ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">Sélectionner une candidature</option>
              {applications.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.candidate_name} - {app.job_title}
                </option>
              ))}
            </select>
            {errors.application_id && <p className="text-red-500 text-sm mt-1">{errors.application_id}</p>}
          </div>

          {/* Date et Heure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              icon={Calendar}
              required
            />

            <FormInput
              label="Heure"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              error={errors.time}
              icon={Clock}
              required
            />
          </div>

          {/* Type d'entretien */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type d'entretien</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "presentiel", label: "Présentiel", icon: MapPin },
                { value: "visio", label: "Visioconférence", icon: Video },
                { value: "telephone", label: "Téléphone", icon: Phone },
              ].map((type) => {
                const Icon = type.icon
                return (
                  <label
                    key={type.value}
                    className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.type === type.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Icon className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Lieu/Lien */}
          <FormInput
            label={
              formData.type === "visio"
                ? "Lien de visioconférence"
                : formData.type === "telephone"
                  ? "Numéro de téléphone"
                  : "Lieu de rendez-vous"
            }
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
            placeholder={getLocationPlaceholder(formData.type)}
            icon={getTypeIcon(formData.type)}
            required={formData.type !== "telephone"}
          />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optionnel)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Informations complémentaires, préparation requise..."
            />
          </div>

          {/* Statut (si modification) */}
          {interview && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="planifie">Planifié</option>
                <option value="confirme">Confirmé</option>
                <option value="reporte">Reporté</option>
                <option value="termine">Terminé</option>
                <option value="annule">Annulé</option>
              </select>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" loading={loading}>
              {interview ? "Modifier" : "Planifier"} l'entretien
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InterviewModal
