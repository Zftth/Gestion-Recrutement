"use client"

import { useState, useEffect } from "react"
import { jobOffersAPI, applicationsAPI } from "../api"
import { Plus, Edit, Trash2, MapPin, Clock, DollarSign, Search, Filter, Briefcase } from "lucide-react" // Added Briefcase import
import Button from "../components/Button"
import FormInput from "../components/FormInput"
import toast from "react-hot-toast"

const JobOffers = ({ user }) => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingOffer, setEditingOffer] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLocation, setFilterLocation] = useState("")
  const [filterType, setFilterType] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    contract_type: "CDI",
    company: "",
    status: "active",
  })

  const contractTypes = [
    { value: "CDI", label: "CDI" },
    { value: "CDD", label: "CDD" },
    { value: "Stage", label: "Stage" },
    { value: "Freelance", label: "Freelance" },
  ]

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "closed", label: "Fermée" },
  ]

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    try {
      const response = await jobOffersAPI.getAll()
      setOffers(response.data)
    } catch (error) {
      toast.error("Erreur lors du chargement des offres")
      console.error("Error fetching offers:", error)
    } finally {
      setLoading(false)
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
      title: "",
      description: "",
      requirements: "",
      location: "",
      salary: "",
      contract_type: "CDI",
      company: "",
      status: "active",
    })
    setEditingOffer(null)
  }

  const openModal = (offer = null) => {
    if (offer) {
      setFormData(offer)
      setEditingOffer(offer)
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
      if (editingOffer) {
        await jobOffersAPI.update(editingOffer.id, formData)
        toast.success("Offre mise à jour avec succès")
      } else {
        await jobOffersAPI.create(formData)
        toast.success("Offre créée avec succès")
      }
      closeModal()
      fetchOffers()
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde")
      console.error("Error saving offer:", error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) {
      return
    }

    try {
      await jobOffersAPI.delete(id)
      toast.success("Offre supprimée avec succès")
      fetchOffers()
    } catch (error) {
      toast.error("Erreur lors de la suppression")
      console.error("Error deleting offer:", error)
    }
  }

  const handleApply = async (offerId) => {
    try {
      await applicationsAPI.create({
        job_offer_id: offerId,
        cover_letter: "Candidature via l'interface",
      })
      toast.success("Candidature envoyée avec succès")
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Vous avez déjà postulé à cette offre")
      } else {
        toast.error("Erreur lors de l'envoi de la candidature")
      }
      console.error("Error applying:", error)
    }
  }

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !filterLocation || offer.location.toLowerCase().includes(filterLocation.toLowerCase())
    const matchesType = !filterType || offer.contract_type === filterType

    return matchesSearch && matchesLocation && matchesType
  })

  const canManageOffers = user?.role === "admin" || user?.role === "recruteur"

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
            <h1 className="text-3xl font-bold text-gray-900">Offres d'emploi</h1>
            <p className="mt-2 text-gray-600">
              {canManageOffers ? "Gérez vos offres d'emploi" : "Découvrez les opportunités disponibles"}
            </p>
          </div>
          {canManageOffers && (
            <Button onClick={() => openModal()} className="flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle offre
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher par titre ou entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Localisation..."
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tous les contrats</option>
                {contractTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Offers List */}
        <div className="space-y-4">
          {filteredOffers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400" /> {/* Fixed undeclared variable error */}
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune offre trouvée</h3>
              <p className="mt-1 text-sm text-gray-500">
                {canManageOffers
                  ? "Commencez par créer votre première offre."
                  : "Aucune offre ne correspond à vos critères."}
              </p>
            </div>
          ) : (
            filteredOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{offer.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          offer.status === "active"
                            ? "bg-green-100 text-green-800"
                            : offer.status === "inactive"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {statusOptions.find((s) => s.value === offer.status)?.label}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">{offer.company}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {offer.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {contractTypes.find((t) => t.value === offer.contract_type)?.label}
                      </div>
                      {offer.salary && (
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {offer.salary}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 line-clamp-3">{offer.description}</p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {user?.role === "candidat" && offer.status === "active" && (
                      <Button onClick={() => handleApply(offer.id)} variant="primary" size="sm">
                        Postuler
                      </Button>
                    )}

                    {canManageOffers && (
                      <>
                        <Button onClick={() => openModal(offer)} variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => handleDelete(offer.id)} variant="danger" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
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
                  {editingOffer ? "Modifier l'offre" : "Nouvelle offre"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormInput
                    label="Titre du poste"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />

                  <FormInput
                    label="Entreprise"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Localisation"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de contrat <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="contract_type"
                        value={formData.contract_type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {contractTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Salaire (optionnel)"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="ex: 45k-55k €"
                    />

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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Décrivez le poste, les missions, l'environnement de travail..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exigences <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Compétences requises, expérience, diplômes..."
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="outline" onClick={closeModal}>
                      Annuler
                    </Button>
                    <Button type="submit" variant="primary">
                      {editingOffer ? "Mettre à jour" : "Créer l'offre"}
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

export default JobOffers
