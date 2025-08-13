"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { dashboardAPI } from "../api"
import { Briefcase, FileText, Calendar, Users, TrendingUp, Clock, CheckCircle } from "lucide-react"
import toast from "react-hot-toast"

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats()
      setStats(response.data)
    } catch (error) {
      toast.error("Erreur lors du chargement des statistiques")
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    let greeting = "Bonjour"
    if (hour >= 18) greeting = "Bonsoir"
    else if (hour >= 12) greeting = "Bon après-midi"

    return `${greeting}, ${user?.name}!`
  }

  const getRoleSpecificStats = () => {
    if (!stats) return []

    switch (user?.role) {
      case "admin":
        return [
          {
            title: "Total Offres",
            value: stats.total_job_offers || 0,
            icon: Briefcase,
            color: "bg-blue-500",
            link: "/offres",
          },
          {
            title: "Total Candidatures",
            value: stats.total_applications || 0,
            icon: FileText,
            color: "bg-green-500",
            link: "/candidatures",
          },
          {
            title: "Total Entretiens",
            value: stats.total_interviews || 0,
            icon: Calendar,
            color: "bg-purple-500",
            link: "/entretiens",
          },
          {
            title: "Utilisateurs Actifs",
            value: stats.active_users || 0,
            icon: Users,
            color: "bg-orange-500",
            link: "#",
          },
        ]

      case "recruteur":
        return [
          {
            title: "Mes Offres",
            value: stats.my_job_offers || 0,
            icon: Briefcase,
            color: "bg-blue-500",
            link: "/offres",
          },
          {
            title: "Candidatures Reçues",
            value: stats.received_applications || 0,
            icon: FileText,
            color: "bg-green-500",
            link: "/candidatures",
          },
          {
            title: "Entretiens Planifiés",
            value: stats.scheduled_interviews || 0,
            icon: Calendar,
            color: "bg-purple-500",
            link: "/entretiens",
          },
          {
            title: "En Attente",
            value: stats.pending_applications || 0,
            icon: Clock,
            color: "bg-yellow-500",
            link: "/candidatures",
          },
        ]

      case "candidat":
        return [
          {
            title: "Mes Candidatures",
            value: stats.my_applications || 0,
            icon: FileText,
            color: "bg-blue-500",
            link: "/candidatures",
          },
          {
            title: "Entretiens Planifiés",
            value: stats.my_interviews || 0,
            icon: Calendar,
            color: "bg-green-500",
            link: "/entretiens",
          },
          {
            title: "Candidatures Acceptées",
            value: stats.accepted_applications || 0,
            icon: CheckCircle,
            color: "bg-emerald-500",
            link: "/candidatures",
          },
          {
            title: "En Cours",
            value: stats.pending_applications || 0,
            icon: Clock,
            color: "bg-yellow-500",
            link: "/candidatures",
          },
        ]

      default:
        return []
    }
  }

  const getQuickActions = () => {
    switch (user?.role) {
      case "admin":
        return [
          { title: "Créer une offre", link: "/offres", icon: Briefcase, color: "bg-blue-600" },
          { title: "Voir candidatures", link: "/candidatures", icon: FileText, color: "bg-green-600" },
          { title: "Planifier entretien", link: "/entretiens", icon: Calendar, color: "bg-purple-600" },
        ]

      case "recruteur":
        return [
          { title: "Publier une offre", link: "/offres", icon: Briefcase, color: "bg-blue-600" },
          { title: "Gérer candidatures", link: "/candidatures", icon: FileText, color: "bg-green-600" },
          { title: "Planifier entretien", link: "/entretiens", icon: Calendar, color: "bg-purple-600" },
        ]

      case "candidat":
        return [
          { title: "Parcourir offres", link: "/offres", icon: Briefcase, color: "bg-blue-600" },
          { title: "Mes candidatures", link: "/candidatures", icon: FileText, color: "bg-green-600" },
          { title: "Mes documents", link: "/documents", icon: FileText, color: "bg-orange-600" },
        ]

      default:
        return []
    }
  }

  const roleSpecificStats = getRoleSpecificStats()
  const quickActions = getQuickActions()

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{getWelcomeMessage()}</h1>
          <p className="mt-2 text-gray-600 capitalize">
            Tableau de bord {user?.role} - Gérez vos activités de recrutement
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {roleSpecificStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Link
                key={index}
                to={stat.link}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className={`${stat.color} rounded-lg p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.color} text-white rounded-lg p-6 hover:opacity-90 transition-opacity`}
                >
                  <div className="flex items-center">
                    <Icon className="h-8 w-8" />
                    <span className="ml-3 text-lg font-medium">{action.title}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Activité récente</h2>
          </div>
          <div className="p-6">
            {stats?.recent_activities && stats.recent_activities.length > 0 ? (
              <div className="space-y-4">
                {stats.recent_activities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.created_at}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune activité récente</h3>
                <p className="mt-1 text-sm text-gray-500">Commencez par explorer les offres ou créer du contenu.</p>
              </div>
            )}
          </div>
        </div>

        {/* Role-specific tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            {user?.role === "admin" && "Conseils pour les administrateurs"}
            {user?.role === "recruteur" && "Conseils pour les recruteurs"}
            {user?.role === "candidat" && "Conseils pour les candidats"}
          </h3>
          <div className="text-sm text-blue-800">
            {user?.role === "admin" && (
              <ul className="list-disc list-inside space-y-1">
                <li>Surveillez les statistiques globales pour identifier les tendances</li>
                <li>Gérez les utilisateurs et leurs permissions</li>
                <li>Analysez les performances des offres d'emploi</li>
              </ul>
            )}
            {user?.role === "recruteur" && (
              <ul className="list-disc list-inside space-y-1">
                <li>Publiez des offres détaillées pour attirer les meilleurs candidats</li>
                <li>Répondez rapidement aux candidatures pour maintenir l'engagement</li>
                <li>Planifiez des entretiens structurés pour évaluer efficacement</li>
              </ul>
            )}
            {user?.role === "candidat" && (
              <ul className="list-disc list-inside space-y-1">
                <li>Maintenez votre profil et vos documents à jour</li>
                <li>Postulez à des offres qui correspondent à vos compétences</li>
                <li>Préparez-vous bien pour vos entretiens</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
