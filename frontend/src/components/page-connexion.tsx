"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Alert, AlertDescription } from "./ui/alert"
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react"

interface LoginPageProps {
  onLogin: (user: any) => void
  onNavigate: (page: string) => void
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (email && password) {
      const mockUser = {
        id: 1,
        name: email.includes("admin") ? "Delphine" : "John Doe",
        email: email,
        role: email.includes("admin") ? "admin" : email.includes("recruiter") ? "recruiter" : "candidate",
      }
      onLogin(mockUser)
    } else {
      setError("Veuillez remplir tous les champs")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Éléments décoratifs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-md">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Connexion
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">Connectez-vous à votre compte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Se connecter
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => onNavigate("register")}
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Pas encore de compte ? S'inscrire
              </Button>
            </div>
          </form>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-indigo-500" />
              Comptes de test :
            </p>
            <div className="text-xs space-y-2">
              <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                <span className="font-medium">Admin:</span>
                <span className="text-indigo-600">admin@test.com</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                <span className="font-medium">Recruteur:</span>
                <span className="text-indigo-600">recruiter@test.com</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                <span className="font-medium">Candidat:</span>
                <span className="text-indigo-600">candidate@test.com</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
