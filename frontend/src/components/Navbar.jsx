"use client"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { LogOut, Briefcase, FileText, Calendar, Upload, BarChart3, Menu, X, ChevronDown } from "lucide-react"
import { authAPI } from "../api"
import toast from "react-hot-toast"

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await authAPI.logout()
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
      navigate("/login")
      toast.success("Déconnexion réussie")
    } catch (error) {
      // Even if API call fails, clear local storage
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
      navigate("/login")
    }
  }

  const getNavItems = () => {
    const baseItems = [
      { path: "/dashboard", label: "Tableau de bord", icon: BarChart3, roles: ["admin", "recruteur", "candidat"] },
    ]

    const roleSpecificItems = {
      admin: [
        { path: "/offres", label: "Gestion des offres", icon: Briefcase },
        { path: "/candidatures", label: "Toutes les candidatures", icon: FileText },
        { path: "/entretiens", label: "Tous les entretiens", icon: Calendar },
        { path: "/documents", label: "Tous les documents", icon: Upload },
      ],
      recruteur: [
        { path: "/offres", label: "Mes offres", icon: Briefcase },
        { path: "/candidatures", label: "Candidatures reçues", icon: FileText },
        { path: "/entretiens", label: "Mes entretiens", icon: Calendar },
        { path: "/documents", label: "Documents", icon: Upload },
      ],
      candidat: [
        { path: "/offres", label: "Offres disponibles", icon: Briefcase },
        { path: "/candidatures", label: "Mes candidatures", icon: FileText },
        { path: "/entretiens", label: "Mes entretiens", icon: Calendar },
        { path: "/documents", label: "Mes documents", icon: Upload },
      ],
    }

    return [...baseItems, ...(roleSpecificItems[user?.role] || [])]
  }

  const navItems = getNavItems()

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "text-purple-600 bg-purple-100"
      case "recruteur":
        return "text-blue-600 bg-blue-100"
      case "candidat":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">RecrutApp</h1>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:ml-8 lg:flex lg:space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-blue-700 bg-blue-50 shadow-sm"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* User menu and mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* User info and menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 text-sm rounded-lg p-2 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${getRoleColor(user?.role)}`}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* User dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                    isActive ? "text-blue-700 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5 inline mr-3" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {(mobileMenuOpen || userMenuOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setMobileMenuOpen(false)
            setUserMenuOpen(false)
          }}
        />
      )}
    </nav>
  )
}

export default Navbar
