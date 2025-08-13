"use client"

/**
 * Modal pour postuler à une offre d'emploi
 * Utilisé par les candidats
 */
import { useState } from "react"
import { X, FileText, Send } from "lucide-react"
import Button from "./Button"
import toast from "react-hot-toast"

const ApplicationModal = ({ isOpen, onClose, onSubmit, jobOffer, loading = false }) => {
  const [formData, setFormData] = useState({
    cover_letter: "",
    cv_file: null,
    motivation: "",
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.cover_letter.trim()) {
      newErrors.cover_letter = "La lettre de motivation est requise"
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

    const applicationData = {
      job_offer_id: jobOffer.id,
      cover_letter: formData.cover_letter,
      motivation: formData.motivation,
      cv_file: formData.cv_file,
    }

    await onSubmit(applicationData)
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "cv_file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const resetForm = () => {
    setFormData({
      cover_letter: "",
      cv_file: null,
      motivation: "",
    })
    setErrors({})
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen || !jobOffer) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Postuler à cette offre</h2>
            <p className="text-gray-600 mt-1">{jobOffer.title}</p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Lettre de motivation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lettre de motivation <span className="text-red-500">*</span>
            </label>
            <textarea
              name="cover_letter"
              value={formData.cover_letter}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.cover_letter ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
              required
            />
            {errors.cover_letter && <p className="text-red-500 text-sm mt-1">{errors.cover_letter}</p>}
          </div>

          {/* CV */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CV (optionnel)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <input
                type="file"
                name="cv_file"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="cv-upload"
              />
              <label htmlFor="cv-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700 font-medium">Cliquez pour choisir un fichier</span>
                <p className="text-gray-500 text-sm mt-1">PDF, DOC, DOCX (max 2MB)</p>
              </label>
              {formData.cv_file && <p className="text-green-600 text-sm mt-2">✓ {formData.cv_file.name}</p>}
            </div>
          </div>

          {/* Motivation supplémentaire */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Motivation supplémentaire (optionnel)
            </label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ajoutez des informations complémentaires..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" loading={loading}>
              <Send className="w-4 h-4 mr-2" />
              Envoyer ma candidature
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplicationModal
