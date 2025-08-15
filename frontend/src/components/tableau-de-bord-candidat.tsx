"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
    
  ArrowLeft,
  Search,
  MapPin,
  Clock,
  Upload,
  Send,
  Eye,
  Star,
  Building,
  DollarSign,
  Calendar,
  FileText,
  Briefcase,
  
} from "lucide-react"

interface CandidateDashboardProps {
  onNavigate: (page: string) => void
}

interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: string
  posted: string
  featured: boolean
}

// Interface pour les candidatures
interface Application {
  id: number
  jobTitle: string
  company: string
  status: string
  appliedDate: string
}

export function CandidateDashboard({ onNavigate }: CandidateDashboardProps) {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Développeur React",
      company: "TechCorp",
      location: "Paris",
      salary: "45-55k€",
      type: "CDI",
      posted: "2 jours",
      featured: true,
    },
    {
      id: 2,
      title: "Designer UX/UI",
      company: "DesignStudio",
      location: "Lyon",
      salary: "40-50k€",
      type: "CDI",
      posted: "1 semaine",
      featured: false,
    },
    {
      id: 3,
      title: "Chef de projet",
      company: "StartupXYZ",
      location: "Remote",
      salary: "50-60k€",
      type: "CDI",
      posted: "3 jours",
      featured: true,
    },
    {
      id: 4,
      title: "Développeur Full Stack",
      company: "WebAgency",
      location: "Marseille",
      salary: "42-52k€",
      type: "CDI",
      posted: "5 jours",
      featured: false,
    },
  ])

  const [myApplications, setMyApplications] = useState<Application[]>([
    { id: 1, jobTitle: "Développeur React", company: "TechCorp", status: "pending", appliedDate: "2024-01-15" },
    { id: 2, jobTitle: "Designer UX/UI", company: "DesignStudio", status: "interview", appliedDate: "2024-01-10" },
    { id: 3, jobTitle: "Chef de projet", company: "StartupXYZ", status: "rejected", appliedDate: "2024-01-08" },
  ])

  const [filters, setFilters] = useState({
    location: "",
    type: "all",
    search: "",
  })

  const [application, setApplication] = useState({
    coverLetter: "",
    cv: null as File | null,
  })

  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false)
  // Correction principale : typage explicite de selectedJob
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const filteredJobs = jobs.filter((job) => {
    return (
      (!filters.search ||
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.type === "all" || job.type === filters.type)
    )
  })

  // Typage explicite du paramètre job
  const handleApply = (job: Job) => {
    setSelectedJob(job)
    setIsApplicationDialogOpen(true)
  }

  const handleSubmitApplication = () => {
    if (application.coverLetter && selectedJob) {
      setMyApplications([
        ...myApplications,
        {
          id: myApplications.length + 1,
          jobTitle: selectedJob.title,
          company: selectedJob.company,
          status: "pending",
          appliedDate: new Date().toISOString().split("T")[0],
        },
      ])
      setApplication({ coverLetter: "", cv: null })
      setIsApplicationDialogOpen(false)
      setSelectedJob(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "interview":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case "rejected":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white"
      case "accepted":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      default:
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "interview":
        return "Entretien"
      case "rejected":
        return "Refusé"
      case "accepted":
        return "Accepté"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => onNavigate("home")}
                variant="ghost"
                size="sm"
                className="hover:bg-emerald-100 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Dashboard Candidat
                  </h1>
                  <p className="text-sm text-gray-500">RecrutPro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-2xl p-2">
            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Offres d'emploi
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200"
            >
              <FileText className="h-4 w-4 mr-2" />
              Mes candidatures
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Rechercher des offres 🔍</h2>
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="search" className="text-sm font-semibold text-gray-700">
                        Recherche
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="search"
                          placeholder="Poste, entreprise..."
                          className="pl-10 h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                          value={filters.search}
                          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                        Localisation
                      </Label>
                      <Input
                        id="location"
                        placeholder="Ville, région..."
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-sm font-semibold text-gray-700">
                        Type de contrat
                      </Label>
                      <Select onValueChange={(value) => setFilters({ ...filters, type: value })}>
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl">
                          <SelectValue placeholder="Tous" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous</SelectItem>
                          <SelectItem value="CDI">CDI</SelectItem>
                          <SelectItem value="CDD">CDD</SelectItem>
                          <SelectItem value="Freelance">Freelance</SelectItem>
                          <SelectItem value="Stage">Stage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                        <Search className="h-4 w-4 mr-2" />
                        Rechercher
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className={`hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/90 backdrop-blur-md overflow-hidden group ${
                    job.featured ? "ring-2 ring-emerald-400" : ""
                  }`}
                >
                  {job.featured && (
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      Offre mise en avant
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                          {job.title}
                        </CardTitle>
                        <CardDescription className="text-lg font-semibold text-blue-600 flex items-center mt-1">
                          <Building className="h-4 w-4 mr-2" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200 font-semibold"
                      >
                        {job.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Publié il y a {job.posted}</span>
                      </div>
                      <div className="flex items-center text-lg font-bold text-green-600">
                        <DollarSign className="h-5 w-5 mr-1" />
                        {job.salary}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-2 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 rounded-xl transition-all duration-200 bg-transparent"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Voir
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                        onClick={() => handleApply(job)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Postuler
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-t-xl">
                <CardTitle className="text-xl font-bold flex items-center">
                  <FileText className="h-6 w-6 mr-3" />
                  Mes candidatures
                </CardTitle>
                <CardDescription className="text-blue-100">Suivez l'état de vos candidatures</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-100">
                      <TableHead className="font-semibold text-gray-700">Poste</TableHead>
                      <TableHead className="font-semibold text-gray-700">Entreprise</TableHead>
                      <TableHead className="font-semibold text-gray-700">Date de candidature</TableHead>
                      <TableHead className="font-semibold text-gray-700">Statut</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myApplications.map((app) => (
                      <TableRow key={app.id} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell className="font-semibold text-gray-800">{app.jobTitle}</TableCell>
                        <TableCell className="text-gray-600 flex items-center">
                          <Building className="h-4 w-4 mr-2 text-blue-500" />
                          {app.company}
                        </TableCell>
                        <TableCell className="text-gray-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-emerald-500" />
                          {app.appliedDate}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${getStatusColor(app.status)} border-0 px-3 py-1 rounded-full font-semibold`}
                          >
                            {getStatusText(app.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-blue-50 hover:border-blue-300 rounded-lg bg-transparent"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
          <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-md border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Postuler pour {selectedJob?.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-600 flex items-center">
                <Building className="h-4 w-4 mr-2" />
                {selectedJob?.company} - {selectedJob?.location}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cv" className="text-sm font-semibold text-gray-700">
                  CV (PDF)
                </Label>
                <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-8 text-center bg-emerald-50/50 hover:bg-emerald-50 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-emerald-500 mb-4" />
                  <p className="text-lg font-semibold text-gray-700 mb-2">Cliquez pour télécharger votre CV</p>
                  <p className="text-sm text-gray-500">ou glissez-déposez votre fichier PDF</p>
                  <Input type="file" accept=".pdf" className="hidden" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverLetter" className="text-sm font-semibold text-gray-700">
                  Lettre de motivation
                </Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
                  rows={6}
                  value={application.coverLetter}
                  onChange={(e) => setApplication({ ...application, coverLetter: e.target.value })}
                  className="border-2 border-gray-200 focus:border-emerald-500 rounded-xl resize-none"
                />
              </div>
              <Button
                onClick={handleSubmitApplication}
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Send className="h-4 w-4 mr-2" />
                Envoyer ma candidature
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}