import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  Bell,
  UserCheck,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Tableau de bord", active: true },
    { icon: Briefcase, label: "Offres d'emploi" },
    { icon: Users, label: "Candidatures" },
    { icon: Calendar, label: "Entretiens" },
    { icon: Bell, label: "Notifications", badge: 3 },
    { icon: UserCheck, label: "Utilisateurs" }
  ];

  return (
    <div className="w-72 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">RecrutPro</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              item.active
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Se déconnecter</span>
        </button>
      </div>
    </div>
  );
}
