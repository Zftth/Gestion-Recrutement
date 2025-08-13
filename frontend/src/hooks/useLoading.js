"use client"

import { useState } from "react"
import toast from "react-hot-toast"

/**
 * Hook personnalisé pour gérer les états de chargement avec notifications
 * @param {string} successMessage - Message de succès par défaut
 * @param {string} errorMessage - Message d'erreur par défaut
 */
export const useLoading = (successMessage = "Opération réussie", errorMessage = "Une erreur est survenue") => {
  const [loading, setLoading] = useState(false)

  const executeWithLoading = async (asyncFunction, customSuccessMessage, customErrorMessage) => {
    setLoading(true)
    try {
      const result = await asyncFunction()
      toast.success(customSuccessMessage || successMessage)
      return result
    } catch (error) {
      // Don't show toast here as API interceptor already handles it
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { loading, executeWithLoading, setLoading }
}

export default useLoading
