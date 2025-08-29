import React from "react";
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  LayoutDashboard,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";

export default function Dashboard() {
  const statsCards = [
    {
      title: "Total Offres",
      value: "24",
      change: "+3 ce mois",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Candidatures",
      value: "156",
      change: "+12% vs mois dernier",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Entretiens",
      value: "8",
      change: "Cette semaine",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Taux de conversion",
      value: "23%",
      change: "+2% vs mois dernier",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const recentCandidates = [
    {
      name: "Marie Dubois",
      position: "Développeur Frontend",
      date: "15/01/2024",
      status: "En Attente",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "Pierre Martin",
      position: "Designer UX/UI",
      date: "14/01/2024",
      status: "Acceptée",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      name: "Sophie Laurent",
      position: "Chef de Projet",
      date: "13/01/2024",
      status: "En Attente",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
  ];

  const upcomingInterviews = [
    {
      title: "Entretien avec Alice Moreau",
      position: "Développeur Backend",
      time: "Demain à 14h00",
      status: "Programmé",
    },
    {
      title: "Entretien avec Thomas Petit",
      position: "Designer UX",
      time: "Vendredi à 10h00",
      status: "Programmé",
    },
    {
      title: "Entretien avec Lucas Bernard",
      position: "Product Manager",
      time: "Lundi à 16h00",
      status: "Programmé",
    },
  ];

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">
          Vue d'ensemble de votre activité de recrutement
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    {card.value}
                  </p>
                  <p className="text-xs text-gray-500">{card.change}</p>
                </div>
                <div className={`${card.bgColor} rounded-lg p-2`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Dashboard Recruteur */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer">
            <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    Dashboard Recruteur
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Accéder à votre espace
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-medium">
                      Disponible
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Entretiens */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer">
            <div className="h-2 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    Entretiens
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Accéder à votre espace
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-medium">
                      Disponible
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer">
            <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-500"></div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    Statistiques
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Accéder à votre espace
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-medium">
                      Disponible
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Candidates */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Candidatures Récentes
              </h2>
              <p className="text-sm text-gray-600">
                Les dernières candidatures reçues
              </p>
            </div>
            <div className="p-6 space-y-4">
              {recentCandidates.map((candidate, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{candidate.name}</p>
                    <p className="text-sm text-gray-600">{candidate.position}</p>
                    <p className="text-xs text-gray-500">{candidate.date}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${candidate.statusColor}`}
                  >
                    {candidate.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Entretiens à Venir
              </h2>
              <p className="text-sm text-gray-600">
                Prochains entretiens programmés
              </p>
            </div>
            <div className="p-6 space-y-4">
              {upcomingInterviews.map((interview, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{interview.title}</p>
                    <p className="text-sm text-gray-600">{interview.position}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {interview.time}
                    </p>
                  </div>
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {interview.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}