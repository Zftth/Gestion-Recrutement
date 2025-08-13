"use client"

/**
 * Composant d'action rapide pour le dashboard
 * Bouton stylisé avec icône pour les actions principales
 */
import { ChevronRight } from "lucide-react"

const QuickAction = ({ title, description, icon: Icon, onClick, color = "blue" }) => {
  const colorClasses = {
    blue: "hover:bg-blue-50 border-blue-200 text-blue-600",
    green: "hover:bg-green-50 border-green-200 text-green-600",
    orange: "hover:bg-orange-50 border-orange-200 text-orange-600",
    purple: "hover:bg-purple-50 border-purple-200 text-purple-600",
  }

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 bg-white border-2 rounded-lg transition-all duration-200
        hover:shadow-md hover:scale-105 text-left group
        ${colorClasses[color]}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg ${colorClasses[color].replace("hover:", "").replace("border-", "bg-").replace("text-", "text-")}`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </div>
    </button>
  )
}

export default QuickAction
