"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ArrowLeft, Plus, Edit, Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import { Users } from "lucide-react" // Import Users component

interface RecruiterDashboardProps {
  onNavigate: (page: string) => void
}

export function RecruiterDashboard({ onNavigate }: RecruiterDashboardProps) {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Développeur React", location: "Paris", status: "active", applications: 12 },
    { id: 2, title: "Designer UX/UI", location: "Lyon", status: "active", applications: 8 },
    { id: 3, title: "Chef de projet", location: "Remote", status: "draft", applications: 0 },
  ])

  const [applications, setApplications] = useState([
    { id: 1, candidateName: "Alice Martin", jobTitle: "Développeur React", status: "pending", date: "2024-01-15" },
    { id: 2, candidateName: "Bob Dupont", jobTitle: "Designer UX/UI", status: "accepted", date: "2024-01-14" },
    { id: 3, candidateName: "Claire Moreau", jobTitle: "Développeur React", status: "rejected", date: "2024-01-13" },
  ])

  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    type: "",
  })

  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false)

  const handleAddJob = () => {
    if (newJob.title && newJob.description && newJob.location) {
      setJobs([
        ...jobs,
        {
          id: jobs.length + 1,
          title: newJob.title,
          location: newJob.location,
          status: "draft",
          applications: 0,
        },
      ])
      setNewJob({ title: "", description: "", location: "", salary: "", type: "" })
      setIsJobDialogOpen(false)
    }
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplications(applications.map((app) => (app.id === id ? { ...app, status: newStatus } : app)))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => onNavigate("home")}
                variant="ghost"
                size="sm"
                className="hover:bg-blue-100 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Dashboard Recruteur
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
          <TabsList>
            <TabsTrigger value="jobs">Offres d'emploi</TabsTrigger>
            <TabsTrigger value="applications">Candidatures</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs">
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Mes offres d'emploi</h2>
                <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Créer une offre
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Nouvelle offre d'emploi</DialogTitle>
                      <DialogDescription>Créez une nouvelle offre d'emploi</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Titre du poste</Label>
                        <Input
                          id="title"
                          value={newJob.title}
                          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                          placeholder="Développeur Full Stack"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newJob.description}
                          onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                          placeholder="Description du poste..."
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Localisation</Label>
                          <Input
                            id="location"
                            value={newJob.location}
                            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                            placeholder="Paris, Remote..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salary">Salaire</Label>
                          <Input
                            id="salary"
                            value={newJob.salary}
                            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                            placeholder="45-55k€"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type de contrat</Label>
                        <Select onValueChange={(value) => setNewJob({ ...newJob, type: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cdi">CDI</SelectItem>
                            <SelectItem value="cdd">CDD</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="stage">Stage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddJob} className="w-full">
                        Créer l'offre
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Localisation</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Candidatures</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          <Badge variant={job.status === "active" ? "default" : "secondary"}>{job.status}</Badge>
                        </TableCell>
                        <TableCell>{job.applications}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Candidatures reçues</CardTitle>
                <CardDescription>Gérez les candidatures pour vos offres</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidat</TableHead>
                      <TableHead>Poste</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.candidateName}</TableCell>
                        <TableCell>{app.jobTitle}</TableCell>
                        <TableCell>{app.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(app.status)}
                            <Badge
                              variant={
                                app.status === "accepted"
                                  ? "default"
                                  : app.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {app.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Select onValueChange={(value) => handleStatusChange(app.id, value)}>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Statut" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">En attente</SelectItem>
                                <SelectItem value="accepted">Accepté</SelectItem>
                                <SelectItem value="rejected">Refusé</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
