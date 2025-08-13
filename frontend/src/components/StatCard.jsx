"use client"

/**
 * Composant de carte de statistiques réutilisable
 * Affiche une métrique avec icône, titre, valeur et évolution
 */
import { TrendingUp, TrendingDown } from "lucide-react"

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "blue", onClick }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    red: "bg-red-50 text-red-600 border-red-200",
  }

  const getTrendColor = (trend) => {
    if (trend === "up") return "text-green-600"
    if (trend === "down") return "text-red-600"
    return "text-gray-500"
  }

  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown

  return (
    <div
      className={`
        bg-white rounded-xl border-2 p-6 transition-all duration-200 
        ${onClick ? "cursor-pointer hover:shadow-lg hover:scale-105" : ""}
        ${colorClasses[color]}
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color].replace("border-", "bg-").replace("text-", "text-")}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
            <TrendIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
    </div>
  )
}

export default StatCard
