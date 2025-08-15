"use client"

import { useState } from "react"
import { Button } from  "./ui/button";

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
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
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ArrowLeft, Plus, CalendarIcon, Clock, MapPin, Video, Users } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface InterviewPageProps {
  onNavigate: (page: string) => void
}

export function InterviewPage({ onNavigate }: InterviewPageProps) {
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidateName: "Alice Martin",
      jobTitle: "Développeur React",
      date: "2024-01-20",
      time: "14:00",
      type: "video",
      status: "scheduled",
      location: "Google Meet",
    },
    {
      id: 2,
      candidateName: "Bob Dupont",
      jobTitle: "Designer UX/UI",
      date: "2024-01-22",
      time: "10:30",
      type: "physical",
      status: "completed",
      location: "15 rue de la Paix, Paris",
    },
    {
      id: 3,
      candidateName: "Claire Moreau",
      jobTitle: "Chef de projet",
      date: "2024-01-25",
      time: "16:00",
      type: "video",
      status: "scheduled",
      location: "Zoom",
    },
  ])

  const [newInterview, setNewInterview] = useState({
  candidateName: "",
  jobTitle: "",
  date: null as Date | null,  // ← Ajouter ce typage explicite
  time: "",
  type: "video" as "video" | "physical",  // ← Optionnel mais recommandé
  location: "",
  notes: "",
})
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleScheduleInterview = () => {
    if (newInterview.candidateName && newInterview.jobTitle && newInterview.date && newInterview.time) {
      setInterviews([
        ...interviews,
        {
          id: interviews.length + 1,
          candidateName: newInterview.candidateName,
          jobTitle: newInterview.jobTitle,
          date: format(newInterview.date, "yyyy-MM-dd"),
          time: newInterview.time,
          type: newInterview.type,
          status: "scheduled",
          location: newInterview.location,
        },
      ])
      setNewInterview({
        candidateName: "",
        jobTitle: "",
        date: null,
        time: "",
        type: "video",
        location: "",
        notes: "",
      })
      setIsDialogOpen(false)
    }
  }

  const getStatusColor = (status:string) => {
    switch (status) {
      case "completed":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getTypeIcon = (type:string) => {
    return type === "video" ? <Video className="h-4 w-4" /> : <Users className="h-4 w-4" />
  }

  const upcomingInterviews = interviews.filter(
    (interview) => interview.status === "scheduled" && new Date(interview.date) >= new Date(),
  )

  const pastInterviews = interviews.filter(
    (interview) => interview.status === "completed" || new Date(interview.date) < new Date(),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => onNavigate("home")}
                variant="ghost"
                size="sm"
                className="hover:bg-green-100 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Gestion des Entretiens
                  </h1>
                  <p className="text-sm text-gray-500">RecrutPro</p>
                </div>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Planifier un entretien
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-800">Planifier un nouvel entretien</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Organisez un entretien avec un candidat
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="candidateName" className="text-sm font-semibold text-gray-700">
                        Nom du candidat
                      </Label>
                      <Input
                        id="candidateName"
                        value={newInterview.candidateName}
                        onChange={(e) => setNewInterview({ ...newInterview, candidateName: e.target.value })}
                        placeholder="Alice Martin"
                        className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-sm font-semibold text-gray-700">
                        Poste
                      </Label>
                      <Input
                        id="jobTitle"
                        value={newInterview.jobTitle}
                        onChange={(e) => setNewInterview({ ...newInterview, jobTitle: e.target.value })}
                        placeholder="Développeur React"
                        className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newInterview.date
                              ? format(newInterview.date, "PPP", { locale: fr })
                              : "Sélectionner une date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newInterview.date ?? undefined}
                            onSelect={(date) => {
                                if (date) setNewInterview({ ...newInterview, date })
                                }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-sm font-semibold text-gray-700">
                        Heure
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={newInterview.time}
                        onChange={(e) => setNewInterview({ ...newInterview, time: e.target.value })}
                        className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">Type d'entretien</Label>
                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant={newInterview.type === "video" ? "default" : "outline"}
                        onClick={() => setNewInterview({ ...newInterview, type: "video" })}
                        className="flex-1 h-12 rounded-xl"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Visioconférence
                      </Button>
                      <Button
                        type="button"
                        variant={newInterview.type === "physical" ? "default" : "outline"}
                        onClick={() => setNewInterview({ ...newInterview, type: "physical" })}
                        className="flex-1 h-12 rounded-xl"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Présentiel
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                      Lieu / Lien
                    </Label>
                    <Input
                      id="location"
                      value={newInterview.location}
                      onChange={(e) => setNewInterview({ ...newInterview, location: e.target.value })}
                      placeholder={newInterview.type === "video" ? "Lien Google Meet / Zoom" : "Adresse du bureau"}
                      className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">
                      Notes (optionnel)
                    </Label>
                    <Textarea
                      id="notes"
                      value={newInterview.notes}
                      onChange={(e) => setNewInterview({ ...newInterview, notes: e.target.value })}
                      placeholder="Notes sur l'entretien..."
                      rows={3}
                      className="border-2 border-gray-200 focus:border-green-500 rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    onClick={handleScheduleInterview}
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Planifier l'entretien
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-green-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Entretiens à venir</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <CalendarIcon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingInterviews.length}</div>
              <p className="text-xs text-green-100">Cette semaine</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Entretiens terminés</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pastInterviews.length}</div>
              <p className="text-xs text-blue-100">Ce mois-ci</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Taux de présence</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-purple-100">Moyenne mensuelle</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-2xl p-2">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200"
            >
              Entretiens à venir
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200"
            >
              Historique
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
              <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-xl">
                <CardTitle className="text-xl font-bold">Entretiens programmés</CardTitle>
                <CardDescription className="text-green-100">
                  Vos prochains entretiens avec les candidats
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-100">
                      <TableHead className="font-semibold text-gray-700">Candidat</TableHead>
                      <TableHead className="font-semibold text-gray-700">Poste</TableHead>
                      <TableHead className="font-semibold text-gray-700">Date & Heure</TableHead>
                      <TableHead className="font-semibold text-gray-700">Type</TableHead>
                      <TableHead className="font-semibold text-gray-700">Lieu</TableHead>
                      <TableHead className="font-semibold text-gray-700">Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingInterviews.map((interview) => (
                      <TableRow key={interview.id} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell className="font-medium text-gray-800">{interview.candidateName}</TableCell>
                        <TableCell className="text-gray-600">{interview.jobTitle}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="h-4 w-4 text-gray-400" />
                            <span>{format(new Date(interview.date), "dd/MM/yyyy", { locale: fr })}</span>
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{interview.time}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(interview.type)}
                            <span className="capitalize">{interview.type === "video" ? "Visio" : "Présentiel"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="truncate max-w-32">{interview.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusColor(interview.status)}
                            className="bg-green-100 text-green-800 border-green-200"
                          >
                            {interview.status === "scheduled" ? "Programmé" : interview.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-xl">
                <CardTitle className="text-xl font-bold">Historique des entretiens</CardTitle>
                <CardDescription className="text-purple-100">Entretiens passés et leurs résultats</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-100">
                      <TableHead className="font-semibold text-gray-700">Candidat</TableHead>
                      <TableHead className="font-semibold text-gray-700">Poste</TableHead>
                      <TableHead className="font-semibold text-gray-700">Date</TableHead>
                      <TableHead className="font-semibold text-gray-700">Type</TableHead>
                      <TableHead className="font-semibold text-gray-700">Statut</TableHead>
                      <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastInterviews.map((interview) => (
                      <TableRow key={interview.id} className="hover:bg-gray-50/50 transition-colors">
                        <TableCell className="font-medium text-gray-800">{interview.candidateName}</TableCell>
                        <TableCell className="text-gray-600">{interview.jobTitle}</TableCell>
                        <TableCell>{format(new Date(interview.date), "dd/MM/yyyy", { locale: fr })}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(interview.type)}
                            <span className="capitalize">{interview.type === "video" ? "Visio" : "Présentiel"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusColor(interview.status)}
                            className="bg-blue-100 text-blue-800 border-blue-200"
                          >
                            {interview.status === "completed" ? "Terminé" : interview.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-purple-50 hover:border-purple-300 rounded-lg bg-transparent"
                          >
                            Voir notes
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
      </main>
    </div>
  )
}
