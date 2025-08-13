"use client"

import { Link, useNavigate } from "react-router-dom"
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react"
import Button from "../components/Button"

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-9xl font-bold text-blue-600 opacity-20">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Search className="w-12 h-12 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page introuvable</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Oups ! La page que vous recherchez semble avoir disparu. Elle a peut-être été déplacée, supprimée ou vous
            avez saisi une URL incorrecte.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleGoBack} variant="primary" size="lg" className="w-full" icon={ArrowLeft}>
              Retour à la page précédente
            </Button>

            <Link to="/dashboard" className="block">
              <Button variant="outline" size="lg" className="w-full bg-transparent" icon={Home}>
                Aller au tableau de bord
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 mr-2" />
            Liens utiles
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/offres"
              className="p-3 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors text-center border border-blue-200"
            >
              Offres d'emploi
            </Link>

            <Link
              to="/candidatures"
              className="p-3 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors text-center border border-blue-200"
            >
              Candidatures
            </Link>

            <Link
              to="/entretiens"
              className="p-3 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors text-center border border-blue-200"
            >
              Entretiens
            </Link>

            <Link
              to="/documents"
              className="p-3 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors text-center border border-blue-200"
            >
              Documents
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Besoin d'aide ? Contactez le support technique à support@recrutapp.com</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
