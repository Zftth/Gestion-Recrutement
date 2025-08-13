"use client"

import { useState, useEffect } from "react"
import { applicationsAPI, jobOffersAPI } from "../api"
import { FileText, Clock, CheckCircle, XCircle, Calendar, Eye, Filter, Search, Send } from "lucide-react"
import Button from "../components/Button"
import toast from "react-hot-toast"

const Applications = ({ user }) => {
  const [applications, setApplications] = useState([])
  const [jobOffers, setJobOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [filterStatus, setFilterStatus] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const [applicationForm, setApplicationForm] = useState({
    job_offer_id: "",
    cover_letter: "",
  })

  const statusOptions = [
    { value: "pending", label: "En attente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    { value: "reviewing", label: "En cours d'examen", color: "bg-blue-100 text-blue-800", icon: Eye },
    { value: "interview", label: "Entretien", color: "bg-purple-100 text-purple-800", icon: Calendar },
    { value: "accepted", label: "Acceptée", color: "bg-green-100 text-green-800", icon: CheckCircle },
    { value: "rejected", label: "Refusée", color: "bg-red-100 text-red-800", icon: XCircle },
  ]

  useEffect(() => {
    fetchApplications()
    if (user?.role === "candidat") {
      fetchJobOffers()
    }
  }, [user])

  const fetchApplications = async () => {
    try {
      const response = await applicationsAPI.getAll()
      setApplications(response.data)
    } catch (error) {
      toast.error("Erreur lors du chargement des candidatures")
      console.error("Error fetching applications:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchJobOffers = async () => {
    try {
      const response = await jobOffersAPI.getAll()
      setJobOffers(response.data.filter((offer) => offer.status === "active"))
    } catch (error) {
      console.error("Error fetching job offers:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setApplicationForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const openApplyModal = (offer = null) => {
    if (offer) {
      setSelectedOffer(offer)
      setApplicationForm({
        job_offer_id: offer.id,
        cover_letter: "",
      })
    } else {
      setSelectedOffer(null)
      setApplicationForm({
        job_offer_id: "",
        cover_letter: "",
      })
    }
    setShowApplyModal(true)
  }

  const closeApplyModal = () => {
    setShowApplyModal(false)
    setSelectedOffer(null)
    setApplicationForm({
      job_offer_id: "",
      cover_letter: "",
    })
  }

  const handleApplySubmit = async (e) => {
    e.preventDefault()

    try {
      await applicationsAPI.create(applicationForm)
      toast.success("Candidature envoyée avec succès")
      closeApplyModal()
      fetchApplications()
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Vous avez déjà postulé à cette offre")
      } else {
        toast.error("Erreur lors de l'envoi de la candidature")
      }
      console.error("Error applying:", error)
    }
  }

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await applicationsAPI.updateStatus(applicationId, newStatus)
      toast.success("Statut mis à jour avec succès")
      fetchApplications()
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut")
      console.error("Error updating status:", error)
    }
  }

  const getStatusInfo = (status) => {
    return statusOptions.find((option) => option.value === status) || statusOptions[0]
  }

  const filteredApplications = applications.filter((application) => {
    const matchesStatus = !filterStatus || application.status === filterStatus
    const matchesSearch =
      !searchTerm ||
      application.job_offer?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.job_offer?.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user?.role !== "candidat" && application.user?.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesStatus && matchesSearch
  })

  const canManageApplications = user?.role === "admin" || user?.role === "recruteur"

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
            <h1 className="text-3xl font-bold text-gray-900">Candidatures</h1>
            <p className="mt-2 text-gray-600">
              {user?.role === "candidat"
                ? "Suivez vos candidatures et postulez à de nouvelles offres"
                : "Gérez les candidatures reçues"}
            </p>
          </div>
          {user?.role === "candidat" && (
            <Button onClick={() => openApplyModal()} className="flex items-center">
              <Send className="w-4 h-4 mr-2" />
              Nouvelle candidature
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={
                  user?.role === "candidat"
                    ? "Rechercher par poste ou entreprise..."
                    : "Rechercher par candidat, poste ou entreprise..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tous les statuts</option>
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune candidature trouvée</h3>
              <p className="mt-1 text-sm text-gray-500">
                {user?.role === "candidat"
                  ? "Commencez par postuler à une offre d'emploi."
                  : "Aucune candidature ne correspond à vos critères."}
              </p>
            </div>
          ) : (
            filteredApplications.map((application) => {
              const statusInfo = getStatusInfo(application.status)
              const StatusIcon = statusInfo.icon

              return (
                <div key={application.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{application.job_offer?.title}</h3>
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full flex items-center ${statusInfo.color}`}
                        >
                          <StatusIcon className="w-4 h-4 mr-1" />
                          {statusInfo.label}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-2">{application.job_offer?.company}</p>

                      {user?.role !== "candidat" && (
                        <p className="text-sm text-gray-500 mb-2">
                          Candidat: <span className="font-medium">{application.user?.name}</span> (
                          {application.user?.email})
                        </p>
                      )}

                      <div className="text-sm text-gray-500 mb-3">
                        Postulé le {new Date(application.created_at).toLocaleDateString("fr-FR")}
                      </div>

                      {application.cover_letter && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Lettre de motivation:</h4>
                          <p className="text-gray-700 text-sm">{application.cover_letter}</p>
                        </div>
                      )}
                    </div>

                    {canManageApplications && (
                      <div className="ml-4">
                        <div className="flex flex-col space-y-2">
                          <label className="text-sm font-medium text-gray-700">Changer le statut:</label>
                          <select
                            value={application.status}
                            onChange={(e) => handleStatusChange(application.id, e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {statusOptions.map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Apply Modal */}
        {showApplyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {selectedOffer ? `Postuler - ${selectedOffer.title}` : "Nouvelle candidature"}
                </h2>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  {!selectedOffer && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Offre d'emploi <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="job_offer_id"
                        value={applicationForm.job_offer_id}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Sélectionnez une offre</option>
                        {jobOffers.map((offer) => (
                          <option key={offer.id} value={offer.id}>
                            {offer.title} - {offer.company}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectedOffer && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h3 className="font-medium text-gray-900">{selectedOffer.title}</h3>
                      <p className="text-gray-600">{selectedOffer.company}</p>
                      <p className="text-sm text-gray-500 mt-1">{selectedOffer.location}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lettre de motivation <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="cover_letter"
                      value={applicationForm.cover_letter}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={closeApplyModal}>
                      Annuler
                    </Button>
                    <Button type="submit" variant="primary">
                      Envoyer la candidature
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

export default Applications
