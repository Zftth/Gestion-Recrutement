import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  Bell,
  UserCheck,
  MessageSquare,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

  const getSidebarItems = (role) => {
  const menuByRole = {
    admin: [
      { icon: LayoutDashboard, label: "Tableau de bord", path: "/dashboard" },
      { icon: Briefcase, label: "Offres d'emploi", path: "/job-offers" },
      { icon: Users, label: "Candidatures", path: "/applications" },
      { icon: Calendar, label: "Entretiens", path: "/interviews" },
      { icon: Bell, label: "Notifications", path: "/notifications" },
      { icon: UserCheck, label: "Documents", path: "/documents" },
    ],
    recruiter: [
      { icon: LayoutDashboard, label: "Tableau de bord", path: "/dashboard/recruteur" },
      { icon: Briefcase, label: "Mes Offres", path: "/job-offers" },
      { icon: Users, label: "Candidatures", path: "/applications" },
      { icon: Calendar, label: "Entretiens", path: "/interviews" },
      { icon: MessageSquare, label: "Messages", path: "/messages" },
    ],
    candidate: [
      { icon: LayoutDashboard, label: "Tableau de bord", path: "/dashboard/candidat" },
      { icon: Briefcase, label: "Offres disponibles", path: "/job-offers" },
      { icon: Users, label: "Mes Candidatures", path: "/applications" },
      { icon: MessageSquare, label: "Messages", path: "/messages" },
    ],
  };

  return menuByRole[role]; 
};


export default function Sidebar() {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const sidebarItems = getSidebarItems(role); // récupère le rôle de l'utilisateur connecté
console.log("📌 Menu généré pour ce rôle:", sidebarItems);


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
          <Link
            key={index}
            to={item.path}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
              location.pathname === item.path
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
