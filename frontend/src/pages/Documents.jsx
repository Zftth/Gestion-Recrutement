"use client"

import { useState, useEffect, useRef } from "react"
import { documentsAPI, applicationsAPI } from "../api"
import { Upload, Download, Trash2, FileText, File, AlertCircle, CheckCircle, Eye } from "lucide-react"
import Button from "../components/Button"
import DocumentPreviewModal from "../components/DocumentPreviewModal"
import ConfirmDialog from "../components/ConfirmDialog"
import toast from "react-hot-toast"

const Documents = ({ user }) => {
  const [documents, setDocuments] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [filterType, setFilterType] = useState("")
  const [filterApplication, setFilterApplication] = useState("")
  const [previewDocument, setPreviewDocument] = useState(null)
  const [deleteDocument, setDeleteDocument] = useState(null)
  const fileInputRef = useRef(null)

  const allowedTypes = {
    "application/pdf": { ext: "PDF", icon: FileText },
    "application/msword": { ext: "DOC", icon: File },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { ext: "DOCX", icon: File },
  }

  const maxFileSize = 2 * 1024 * 1024 // 2MB

  const documentTypes = [
    { value: "cv", label: "CV" },
    { value: "cover_letter", label: "Lettre de motivation" },
    { value: "diploma", label: "Diplôme" },
    { value: "certificate", label: "Certificat" },
    { value: "other", label: "Autre" },
  ]

  useEffect(() => {
    fetchDocuments()
    if (user?.role === "candidat") {
      fetchApplications()
    }
  }, [user])

  const fetchDocuments = async () => {
    try {
      const response = await documentsAPI.getAll()
      setDocuments(response.data)
    } catch (error) {
      toast.error("Erreur lors du chargement des documents")
      console.error("Error fetching documents:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      const response = await applicationsAPI.getAll()
      setApplications(response.data)
    } catch (error) {
      console.error("Error fetching applications:", error)
    }
  }

  const validateFile = (file) => {
    if (!allowedTypes[file.type]) {
      toast.error("Type de fichier non autorisé. Seuls les fichiers PDF, DOC et DOCX sont acceptés.")
      return false
    }

    if (file.size > maxFileSize) {
      toast.error("Le fichier est trop volumineux. Taille maximale : 2 Mo.")
      return false
    }

    return true
  }

  const handleFileUpload = async (files, documentType = "other", applicationId = null) => {
    const file = files[0]
    if (!file || !validateFile(file)) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", documentType)
      formData.append("name", file.name)
      if (applicationId) {
        formData.append("application_id", applicationId)
      }

      await documentsAPI.upload(formData)
      toast.success("Document uploadé avec succès")
      fetchDocuments()
    } catch (error) {
      if (error.response?.status === 413) {
        toast.error("Le fichier est trop volumineux")
      } else {
        toast.error("Erreur lors de l'upload du document")
      }
      console.error("Error uploading document:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDownload = async (documentId, fileName) => {
    try {
      const response = await documentsAPI.download(documentId)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      toast.error("Erreur lors du téléchargement")
      console.error("Error downloading document:", error)
    }
  }

  const handleDelete = async (documentId) => {
    try {
      await documentsAPI.delete(documentId)
      toast.success("Document supprimé avec succès")
      fetchDocuments()
      setDeleteDocument(null)
    } catch (error) {
      toast.error("Erreur lors de la suppression")
      console.error("Error deleting document:", error)
    }
  }

  const getFileIcon = (mimeType) => {
    const typeInfo = allowedTypes[mimeType]
    return typeInfo ? typeInfo.icon : File
  }

  const getFileExtension = (mimeType) => {
    const typeInfo = allowedTypes[mimeType]
    return typeInfo ? typeInfo.ext : "FILE"
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesType = !filterType || doc.type === filterType
    const matchesApplication = !filterApplication || doc.application_id === Number.parseInt(filterApplication)
    return matchesType && matchesApplication
  })

  const canManageAllDocuments = user?.role === "admin" || user?.role === "recruteur"

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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="mt-2 text-gray-600">
            {user?.role === "candidat"
              ? "Gérez vos CV, lettres de motivation et autres documents"
              : "Consultez les documents des candidats"}
          </p>
        </div>

        {/* Upload Section - Only for candidates */}
        {user?.role === "candidat" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Uploader un document</h2>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : uploading
                    ? "border-gray-300 bg-gray-50"
                    : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                  <p className="text-gray-600">Upload en cours...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Glissez-déposez vos fichiers ici ou{" "}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-500 underline"
                    >
                      parcourez
                    </button>
                  </p>
                  <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX jusqu'à 2 Mo</p>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>Formats acceptés : PDF, DOC, DOCX</span>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>

            {/* Quick Upload Buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              {documentTypes.slice(0, 2).map((type) => (
                <Button
                  key={type.value}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const input = document.createElement("input")
                    input.type = "file"
                    input.accept = ".pdf,.doc,.docx"
                    input.onchange = (e) => handleFileUpload(e.target.files, type.value)
                    input.click()
                  }}
                  disabled={uploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Uploader {type.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type de document</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tous les types</option>
                {documentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {user?.role === "candidat" && applications.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Candidature associée</label>
                <select
                  value={filterApplication}
                  onChange={(e) => setFilterApplication(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Toutes les candidatures</option>
                  {applications.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.job_offer?.title} - {app.job_offer?.company}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {user?.role === "candidat" ? "Mes documents" : "Documents des candidats"}
            </h2>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun document trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {user?.role === "candidat"
                  ? "Commencez par uploader votre CV ou une lettre de motivation."
                  : "Aucun document ne correspond à vos critères."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredDocuments.map((document) => {
                const FileIcon = getFileIcon(document.mime_type)
                const fileExtension = getFileExtension(document.mime_type)
                const documentTypeLabel = documentTypes.find((t) => t.value === document.type)?.label || "Autre"

                return (
                  <div key={document.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileIcon className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-sm font-medium text-gray-900 truncate">{document.name}</h3>
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                              {fileExtension}
                            </span>
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                              {documentTypeLabel}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{formatFileSize(document.size)}</span>
                            <span>Uploadé le {new Date(document.created_at).toLocaleDateString("fr-FR")}</span>
                            {canManageAllDocuments && document.user && <span>Par {document.user.name}</span>}
                          </div>

                          {document.application && (
                            <div className="mt-1 text-xs text-gray-500">
                              Associé à: {document.application.job_offer?.title} -{" "}
                              {document.application.job_offer?.company}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => setPreviewDocument(document)}
                          variant="outline"
                          size="sm"
                          title="Prévisualiser"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Button onClick={() => handleDownload(document.id, document.name)} variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>

                        {(user?.role === "candidat" || canManageAllDocuments) && (
                          <Button
                            onClick={() => setDeleteDocument(document)}
                            variant="danger"
                            size="sm"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Upload Tips */}
        {user?.role === "candidat" && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-blue-900 mb-2">Conseils pour vos documents</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Nommez vos fichiers clairement (ex: "CV_Jean_Dupont.pdf")</li>
                  <li>• Utilisez des formats PDF pour une meilleure compatibilité</li>
                  <li>• Gardez vos documents à jour et supprimez les anciennes versions</li>
                  <li>• Associez vos documents aux candidatures correspondantes</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        isOpen={!!previewDocument}
        onClose={() => setPreviewDocument(null)}
        document={previewDocument}
        onDownload={handleDownload}
      />

      {/* Confirm Dialog for deletion */}
      <ConfirmDialog
        isOpen={!!deleteDocument}
        onClose={() => setDeleteDocument(null)}
        onConfirm={() => handleDelete(deleteDocument?.id)}
        title="Supprimer le document"
        message={`Êtes-vous sûr de vouloir supprimer "${deleteDocument?.name}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="danger"
      />
    </div>
  )
}

export default Documents
