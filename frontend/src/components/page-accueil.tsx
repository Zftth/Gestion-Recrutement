"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Users, Briefcase, FileText, Calendar, BarChart3, LogOut, TrendingUp, Clock, CheckCircle } from "lucide-react"

interface HomePageProps {
  user: any
  onNavigate: (page: string) => void
  onLogout: () => void
}

export function HomePage({ user, onNavigate, onLogout }: HomePageProps) {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="absolute inset-0 bg-black/20"></div>
        <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Users className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RecrutPro
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Connectez-vous pour accéder à votre espace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <Button
              onClick={() => onNavigate("login")}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Se connecter
            </Button>
            <Button
              onClick={() => onNavigate("register")}
              variant="outline"
              className="w-full h-12 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 font-semibold rounded-xl transition-all duration-200"
            >
              S'inscrire
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getMenuItems = () => {
    const baseItems = [
      { icon: Calendar, label: "Entretiens", page: "interviews", color: "from-green-400 to-blue-500" },
      { icon: BarChart3, label: "Statistiques", page: "statistics", color: "from-purple-400 to-pink-500" },
    ]

    switch (user.role) {
      case "admin":
        return [
          { icon: Users, label: "Dashboard Admin", page: "admin", color: "from-red-400 to-orange-500" },
          ...baseItems,
        ]
      case "recruiter":
        return [
          { icon: Briefcase, label: "Dashboard Recruteur", page: "recruiter", color: "from-blue-400 to-cyan-500" },
          ...baseItems,
        ]
      case "candidate":
        return [
          { icon: FileText, label: "Dashboard Candidat", page: "candidate", color: "from-emerald-400 to-teal-500" },
          { icon: Calendar, label: "Entretiens", page: "interviews", color: "from-green-400 to-blue-500" },
        ]
      default:
        return baseItems
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                RecrutPro
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant="secondary"
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0 font-semibold"
              >
                {user.role}
              </Badge>
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <Button
                onClick={onLogout}
                variant="ghost"
                size="sm"
                className="hover:bg-red-50 hover:text-red-600 rounded-lg"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Bienvenue, {user.name} 👋
          </h2>
          <p className="text-xl text-gray-600">Voici un résumé de votre activité récente</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Offres actives</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <p className="text-xs text-blue-100">+2 cette semaine</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">Candidatures</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <FileText className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">48</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <p className="text-xs text-emerald-100">+12 cette semaine</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Entretiens</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <div className="flex items-center mt-2">
                <Clock className="h-4 w-4 mr-1" />
                <p className="text-xs text-purple-100">Cette semaine</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getMenuItems().map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm overflow-hidden group"
              onClick={() => onNavigate(item.page)}
            >
              <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
              <CardContent className="p-8">
                <div className="flex items-center space-x-6">
                  <div
                    className={`p-4 bg-gradient-to-r ${item.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">{item.label}</h3>
                    <p className="text-sm text-gray-600">Accéder à votre espace</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Disponible
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
