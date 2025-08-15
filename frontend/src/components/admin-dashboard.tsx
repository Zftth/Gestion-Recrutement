"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
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
import { ArrowLeft, Plus, Edit, Trash2, UserCheck, Users, Shield, Crown, User } from "lucide-react"

interface AdminDashboardProps {
  onNavigate: (page: string) => void
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "candidate", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "recruiter", status: "active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "candidate", status: "inactive" },
  ])

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      setUsers([
        ...users,
        {
          id: users.length + 1,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          status: "active",
        },
      ])
      setNewUser({ name: "", email: "", role: "", password: "" })
      setIsDialogOpen(false)
    }
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleChangeRole = (id: number, newRole: string) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, role: newRole } : user)))
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4" />
      case "recruiter":
        return <Shield className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white"
      case "recruiter":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      default:
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
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
                className="hover:bg-indigo-100 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Dashboard Admin
                  </h1>
                  <p className="text-sm text-gray-500">RecrutPro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Gestion des utilisateurs</h2>
              <p className="text-gray-600">Administrez les comptes utilisateurs de la plateforme</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg rounded-xl px-6 py-3 transform hover:scale-105 transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un utilisateur
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-800">Nouvel utilisateur</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Ajoutez un nouvel utilisateur au système
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                      Nom complet
                    </Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="John Doe"
                      className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="john@example.com"
                      className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                      Mot de passe
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="••••••••"
                      className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-semibold text-gray-700">
                      Rôle
                    </Label>
                    <Select onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
                        <SelectValue placeholder="Sélectionnez un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="candidate">Candidat</SelectItem>
                        <SelectItem value="recruiter">Recruteur</SelectItem>
                        <SelectItem value="admin">Administrateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleAddUser}
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Ajouter l'utilisateur
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
            <CardTitle className="text-xl font-bold flex items-center">
              <Users className="h-6 w-6 mr-3" />
              Liste des utilisateurs
            </CardTitle>
            <CardDescription className="text-indigo-100">Gérez les utilisateurs de la plateforme</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100">
                  <TableHead className="font-semibold text-gray-700">Nom</TableHead>
                  <TableHead className="font-semibold text-gray-700">Email</TableHead>
                  <TableHead className="font-semibold text-gray-700">Rôle</TableHead>
                  <TableHead className="font-semibold text-gray-700">Statut</TableHead>
                  <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium text-gray-800">{user.name}</TableCell>
                    <TableCell className="text-gray-600">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={`${getRoleColor(user.role)} border-0 px-3 py-1 rounded-full font-semibold`}>
                        <div className="flex items-center space-x-1">
                          {getRoleIcon(user.role)}
                          <span>{user.role}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "active" ? "default" : "secondary"}
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-gray-100 text-gray-800 border-gray-200"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-blue-50 hover:border-blue-300 rounded-lg bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Select onValueChange={(value) => handleChangeRole(user.id, value)}>
                          <SelectTrigger className="w-32 h-8 rounded-lg">
                            <UserCheck className="h-4 w-4" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="candidate">Candidat</SelectItem>
                            <SelectItem value="recruiter">Recruteur</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-500 hover:bg-red-600 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
