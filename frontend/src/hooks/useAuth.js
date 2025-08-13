"use client"

/**
 * Hook personnalisé pour la gestion de l'authentification
 * Centralise la logique d'auth dans l'application
 */
import { useState, useEffect } from "react"
import { authAPI } from "../api"
import toast from "react-hot-toast"

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token")
      const userData = localStorage.getItem("user_data")

      if (token && userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error("Erreur parsing user data:", error)
          localStorage.removeItem("auth_token")
          localStorage.removeItem("user_data")
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      const { token, user: userData } = response.data

      localStorage.setItem("auth_token", token)
      localStorage.setItem("user_data", JSON.stringify(userData))
      setUser(userData)

      toast.success(`Bienvenue ${userData.name} !`)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || "Erreur de connexion"
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_data")
      setUser(null)
      toast.success("Déconnexion réussie")
    }
  }

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData)
      toast.success("Inscription réussie ! Vous pouvez maintenant vous connecter.")
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || "Erreur lors de l'inscription"
      toast.error(message)
      return { success: false, error: message }
    }
  }

  return {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isRecruiter: user?.role === "recruteur",
    isCandidate: user?.role === "candidat",
  }
}
