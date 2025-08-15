"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  ArrowLeft,
  Download,
  FileText,
  Users,
  Briefcase,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface StatisticsPageProps {
  onNavigate: (page: string) => void
}

export function StatisticsPage({ onNavigate }: StatisticsPageProps) {
  const [timeRange, setTimeRange] = useState("month")

  const applicationData = [
    { name: "Jan", applications: 45, offers: 12 },
    { name: "Fév", applications: 52, offers: 15 },
    { name: "Mar", applications: 48, offers: 18 },
    { name: "Avr", applications: 61, offers: 22 },
    { name: "Mai", applications: 55, offers: 19 },
    { name: "Jun", applications: 67, offers: 25 },
  ]

  const conversionData = [
    { name: "Candidatures reçues", value: 320, color: "#3b82f6" },
    { name: "Entretiens programmés", value: 128, color: "#10b981" },
    { name: "Offres envoyées", value: 45, color: "#f59e0b" },
    { name: "Embauches", value: 18, color: "#ef4444" },
  ]

  const departmentData = [
    { name: "IT", applications: 120, hires: 8 },
    { name: "Marketing", applications: 85, hires: 5 },
    { name: "Ventes", applications: 95, hires: 7 },
    { name: "RH", applications: 45, hires: 2 },
    { name: "Finance", applications: 35, hires: 3 },
  ]

  const handleExport = (format: string) => {
    console.log(`Export en ${format}`)
    alert(`Export ${format} généré avec succès !`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => onNavigate("home")}
                variant="ghost"
                size="sm"
                className="hover:bg-purple-100 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Statistiques
                  </h1>
                  <p className="text-sm text-gray-500">RecrutPro</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40 h-10 border-2 border-gray-200 focus:border-purple-500 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="quarter">Ce trimestre</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => handleExport("PDF")}
                variant="outline"
                className="border-2 border-red-200 hover:border-red-400 hover:bg-red-50 rounded-xl"
              >
                <FileText className="h-4 w-4 mr-2 text-red-500" />
                PDF
              </Button>
              <Button
                onClick={() => handleExport("Excel")}
                variant="outline"
                className="border-2 border-green-200 hover:border-green-400 hover:bg-green-50 rounded-xl"
              >
                <Download className="h-4 w-4 mr-2 text-green-500" />
                Excel
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Offres actives</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">25</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <p className="text-xs text-blue-100">
                  <span className="text-green-300 font-semibold">+12%</span> vs mois dernier
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">Candidatures</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">320</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <p className="text-xs text-emerald-100">
                  <span className="text-green-300 font-semibold">+8%</span> vs mois dernier
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-red-500 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Taux de conversion</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5.6%</div>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 mr-1" />
                <p className="text-xs text-orange-100">
                  <span className="text-red-300 font-semibold">-2%</span> vs mois dernier
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Durée moyenne</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28j</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1" />
                <p className="text-xs text-purple-100">
                  <span className="text-green-300 font-semibold">-3j</span> vs mois dernier
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-2xl p-2">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200"
            >
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger
              value="conversion"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200"
            >
              Conversion
            </TabsTrigger>
            <TabsTrigger
              value="departments"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200"
            >
              Départements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
                  <CardTitle className="text-xl font-bold">Évolution des candidatures</CardTitle>
                  <CardDescription className="text-blue-100">
                    Nombre de candidatures et d'offres par mois
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={applicationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="applications"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        name="Candidatures"
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="offers"
                        stroke="#10b981"
                        strokeWidth={3}
                        name="Offres"
                        dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-xl">
                  <CardTitle className="text-xl font-bold">Répartition par statut</CardTitle>
                  <CardDescription className="text-emerald-100">
                    Distribution des candidatures par statut
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={conversionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {conversionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conversion">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-xl">
                <CardTitle className="text-xl font-bold">Entonnoir de conversion</CardTitle>
                <CardDescription className="text-orange-100">
                  Suivi du parcours candidat de la candidature à l'embauche
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  {conversionData.map((step, index) => {
                    const percentage = index === 0 ? 100 : (step.value / conversionData[0].value) * 100
                    return (
                      <div key={step.name} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-lg text-gray-800">{step.name}</span>
                          <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            {step.value} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                          <div
                            className="h-4 rounded-full transition-all duration-500 shadow-lg"
                            style={{
                              width: `${percentage}%`,
                              background: `linear-gradient(90deg, ${step.color}, ${step.color}dd)`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
                <CardTitle className="text-xl font-bold">Performance par département</CardTitle>
                <CardDescription className="text-indigo-100">Candidatures et embauches par département</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="applications"
                      fill="url(#applicationsGradient)"
                      name="Candidatures"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar dataKey="hires" fill="url(#hiresGradient)" name="Embauches" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="applicationsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                      <linearGradient id="hiresGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#047857" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <Clock className="h-6 w-6 mr-3" />
                Temps de recrutement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/20 rounded-lg">
                  <span className="text-sm font-medium">Temps moyen</span>
                  <span className="font-bold text-lg">28 jours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/20 rounded-lg">
                  <span className="text-sm font-medium">Plus rapide</span>
                  <span className="font-bold text-lg">12 jours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/20 rounded-lg">
                  <span className="text-sm font-medium">Plus long</span>
                  <span className="font-bold text-lg">65 jours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <Users className="h-6 w-6 mr-3" />
                Sources de candidatures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/20 rounded-lg">
                  <span className="text-sm font-medium">Site carrière</span>
                  <span className="font-bold text-lg">45%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/20 rounded-lg">
                  <span className="text-sm font-medium">LinkedIn</span>
                  <span className="font-bold text-lg">30%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/20 rounded-lg">
                  <span className="text-sm font-medium">Indeed</span>
                  <span className="font-bold text-lg">25%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center">
                <Target className="h-6 w-6 mr-3" />
                Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/20 rounded-lg">
                  <span className="text-sm font-medium">Candidats</span>
                  <span className="font-bold text-lg">4.2/5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/20 rounded-lg">
                  <span className="text-sm font-medium">Recruteurs</span>
                  <span className="font-bold text-lg">4.5/5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/20 rounded-lg">
                  <span className="text-sm font-medium">Managers</span>
                  <span className="font-bold text-lg">4.1/5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
