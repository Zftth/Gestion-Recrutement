"use client"

import { useState, useEffect } from "react"
import { interviewsAPI, applicationsAPI } from "../api"
import { Calendar, Clock, MapPin, User, Plus, Edit, Trash2, Video, Phone, Building } from "lucide-react"
import Button from "../components/Button"
import FormInput from "../components/FormInput"
import toast from "react-hot-toast"

const Interviews = ({ user }) => {
  const [interviews, setInterviews] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingInterview, setEditingInterview] = useState(null)
  const [filterDate, setFilterDate] = useState("")
  const [filterType, setFilterType] = useState("")

  const [formData, setFormData] = useState({
    application_id: "",
    scheduled_at: "",
    duration: 60,
    location: "",
    type: "in-person",
    notes: "",
    status: "scheduled",
  })

  const interviewTypes = [
    { value: "in-person", label: "En présentiel", icon: Building },
    { value: "video", label: "Visioconférence", icon: Video },
    { value: "phone", label: "Téléphone", icon: Phone },
  ]

  const statusOptions = [
    { value: "scheduled", label: "Planifié", color: "bg-blue-100 text-blue-800" },
    { value: "completed", label: "Terminé", color: "bg-green-100 text-green-800" },
    { value: "cancelled", label: "Annulé", color: "bg-red-100 text-red-800" },
    { value: "rescheduled", label: "Reporté", color: "bg-yellow-100 text-yellow-800" },
  ]

  useEffect(() => {
    fetchInterviews()
    if (user?.role !== "candidat") {
      fetchApplications()
    }
  }, [user])

  const fetchInterviews = async () => {
    try {
      const response = await interviewsAPI.getAll()
      setInterviews(response.data)
    } catch (error) {
      toast.error("Erreur lors du chargement des entretiens")
      console.error("Error fetching interviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      const response = await applicationsAPI.getAll()
      // Filter applications that are in interview status or accepted
      setApplications(response.data.filter((app) => ["interview", "accepted"].includes(app.status)))
    } catch (error) {
      console.error("Error fetching applications:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      application_id: "",
      scheduled_at: "",
      duration: 60,
      location: "",
      type: "in-person",
      notes: "",
      status: "scheduled",
    })
    setEditingInterview(null)
  }

  const openModal = (interview = null) => {
    if (interview) {
      setFormData({
        ...interview,
        scheduled_at: new Date(interview.scheduled_at).toISOString().slice(0, 16),
      })
      setEditingInterview(interview)
    } else {
      resetForm()
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    resetForm()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const submitData = {
        ...formData,
        scheduled_at: new Date(formData.scheduled_at).toISOString(),
      }

      if (editingInterview) {
        await interviewsAPI.update(editingInterview.id, submitData)
        toast.success("Entretien mis à jour avec succès")
      } else {
        await interviewsAPI.create(submitData)
        toast.success("Entretien planifié avec succès")
      }
      closeModal()
      fetchInterviews()
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde")
      console.error("Error saving interview:", error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet entretien ?")) {
      return
    }

    try {
      await interviewsAPI.delete(id)
      toast.success("Entretien supprimé avec succès")
      fetchInterviews()
    } catch (error) {
      toast.error("Erreur lors de la suppression")
      console.error("Error deleting interview:", error)
    }
  }

  const getTypeInfo = (type) => {
    return interviewTypes.find((t) => t.value === type) || interviewTypes[0]
  }

  const getStatusInfo = (status) => {
    return statusOptions.find((s) => s.value === status) || statusOptions[0]
  }

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString("fr-FR"),
      time: date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    }
  }

  const filteredInterviews = interviews.filter((interview) => {
    const matchesDate = !filterDate || interview.scheduled_at.startsWith(filterDate)
    const matchesType = !filterType || interview.type === filterType

    return matchesDate && matchesType
  })

  const canManageInterviews = user?.role === "admin" || user?.role === "recruteur"

  // Group interviews by date for better organization
  const groupedInterviews = filteredInterviews.reduce((groups, interview) => {
    const date = new Date(interview.scheduled_at).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(interview)
    return groups
  }, {})

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Entretiens</h1>
            <p className="mt-2 text-gray-600">
              {canManageInterviews ? "Planifiez et gérez vos entretiens" : "Consultez vos entretiens planifiés"}
            </p>
          </div>
          {canManageInterviews && (
            <Button onClick={() => openModal()} className="flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Planifier un entretien
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filtrer par date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type d'entretien</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tous les types</option>
                {interviewTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Interviews List */}
        <div className="space-y-6">
          {Object.keys(groupedInterviews).length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun entretien trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {canManageInterviews
                  ? "Commencez par planifier votre premier entretien."
                  : "Aucun entretien planifié pour le moment."}
              </p>
            </div>
          ) : (
            Object.entries(groupedInterviews)
              .sort(([a], [b]) => new Date(a) - new Date(b))
              .map(([date, dayInterviews]) => (
                <div key={date} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {new Date(date).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {dayInterviews
                      .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))
                      .map((interview) => {
                        const typeInfo = getTypeInfo(interview.type)
                        const statusInfo = getStatusInfo(interview.status)
                        const dateTime = formatDateTime(interview.scheduled_at)
                        const TypeIcon = typeInfo.icon

                        return (
                          <div key={interview.id} className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {interview.application?.job_offer?.title}
                                  </h3>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                                    {statusInfo.label}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Clock className="w-4 h-4 mr-2" />
                                      {dateTime.time} ({interview.duration} min)
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <TypeIcon className="w-4 h-4 mr-2" />
                                      {typeInfo.label}
                                    </div>
                                    {interview.location && (
                                      <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {interview.location}
                                      </div>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-600">
                                      <User className="w-4 h-4 mr-2" />
                                      {user?.role === "candidat"
                                        ? `Entreprise: ${interview.application?.job_offer?.company}`
                                        : `Candidat: ${interview.application?.user?.name}`}
                                    </div>
                                    {user?.role !== "candidat" && (
                                      <div className="text-sm text-gray-500">
                                        Email: {interview.application?.user?.email}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {interview.notes && (
                                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                    <h4 className="font-medium text-gray-900 mb-1">Notes:</h4>
                                    <p className="text-sm text-gray-700">{interview.notes}</p>
                                  </div>
                                )}
                              </div>

                              {canManageInterviews && (
                                <div className="flex items-center space-x-2 ml-4">
                                  <Button onClick={() => openModal(interview)} variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button onClick={() => handleDelete(interview.id)} variant="danger" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Modal for Create/Edit */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingInterview ? "Modifier l'entretien" : "Planifier un entretien"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Candidature <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="application_id"
                      value={formData.application_id}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Sélectionnez une candidature</option>
                      {applications.map((application) => (
                        <option key={application.id} value={application.id}>
                          {application.job_offer?.title} - {application.user?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Date et heure"
                      type="datetime-local"
                      name="scheduled_at"
                      value={formData.scheduled_at}
                      onChange={handleInputChange}
                      required
                    />

                    <FormInput
                      label="Durée (minutes)"
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      min="15"
                      max="240"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type d'entretien <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {interviewTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Statut <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {statusOptions.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <FormInput
                    label="Lieu/Lien (optionnel)"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Adresse, lien de visioconférence, numéro de téléphone..."
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optionnel)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Instructions particulières, points à aborder..."
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={closeModal}>
                      Annuler
                    </Button>
                    <Button type="submit" variant="primary">
                      {editingInterview ? "Mettre à jour" : "Planifier l'entretien"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Interviews
