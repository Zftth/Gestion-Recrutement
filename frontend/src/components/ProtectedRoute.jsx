"use client"

import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { authAPI } from "../api"
import Loader from "./Loader"

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const token = localStorage.getItem("token")

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await authAPI.me()
        const userData = response.data.user || response.data
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
      } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [token])

  if (loading) {
    return <Loader />
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h1>
          <p className="text-gray-600 mb-6">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
          <Navigate to="/dashboard" replace />
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
