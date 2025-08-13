"use client"

import { useState, useEffect } from "react"
import { X, Download, ExternalLink, FileText, AlertCircle, Loader2 } from "lucide-react"
import Button from "./Button"
import { documentsAPI } from "../api"
import toast from "react-hot-toast"

const DocumentPreviewModal = ({ isOpen, onClose, document, onDownload }) => {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isOpen && document) {
      loadPreview()
    } else {
      // Clean up when modal closes
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
      setError(null)
    }

    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [isOpen, document])

  const loadPreview = async () => {
    if (!document) return

    setLoading(true)
    setError(null)

    try {
      // For PDF files, we can preview directly
      if (document.mime_type === "application/pdf") {
        const response = await documentsAPI.download(document.id)
        const blob = new Blob([response.data], { type: "application/pdf" })
        const url = URL.createObjectURL(blob)
        setPreviewUrl(url)
      } else {
        // For DOC/DOCX files, we'll show a message that preview isn't available
        setError("preview_not_supported")
      }
    } catch (error) {
      console.error("Error loading preview:", error)
      setError("load_error")
      toast.error("Erreur lors du chargement de la prévisualisation")
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (onDownload && document) {
      onDownload(document.id, document.name)
    }
  }

  const openInNewTab = () => {
    if (previewUrl) {
      window.open(previewUrl, "_blank")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{document?.name}</h2>
              <p className="text-sm text-gray-500">
                {document?.mime_type === "application/pdf"
                  ? "Document PDF"
                  : document?.mime_type === "application/msword"
                    ? "Document Word"
                    : "Document Word"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {previewUrl && (
              <Button variant="outline" size="sm" onClick={openInNewTab}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Ouvrir dans un nouvel onglet
              </Button>
            )}

            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Télécharger
            </Button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Chargement de la prévisualisation...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                {error === "preview_not_supported" ? (
                  <>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Prévisualisation non disponible</h3>
                    <p className="text-gray-600 mb-6">
                      La prévisualisation n'est pas disponible pour les fichiers Word. Vous pouvez télécharger le
                      document pour le consulter.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
                    <p className="text-gray-600 mb-6">
                      Impossible de charger la prévisualisation. Vous pouvez télécharger le document directement.
                    </p>
                  </>
                )}

                <Button variant="primary" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le document
                </Button>
              </div>
            </div>
          ) : previewUrl ? (
            <iframe
              src={previewUrl}
              className="w-full h-full border-0"
              title={`Prévisualisation de ${document?.name}`}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucune prévisualisation disponible</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with document info */}
        {document && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span>Taille: {formatFileSize(document.size)}</span>
                <span>Uploadé le {new Date(document.created_at).toLocaleDateString("fr-FR")}</span>
                {document.user && <span>Par {document.user.name}</span>}
              </div>

              {document.application && (
                <div className="text-right">
                  <p className="font-medium">Candidature associée:</p>
                  <p>
                    {document.application.job_offer?.title} - {document.application.job_offer?.company}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export default DocumentPreviewModal
