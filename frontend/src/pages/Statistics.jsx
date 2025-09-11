import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, Briefcase, Target, Clock, TrendingUp, TrendingDown } from 'lucide-react';

const RecruitmentDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Ce mois');
  const [activeTab, setActiveTab] = useState('Vue d\'ensemble');

  // Données pour les graphiques
  const monthlyData = [
    { month: 'Jan', candidatures: 45, offres: 12 },
    { month: 'Fév', candidatures: 52, offres: 15 },
    { month: 'Mar', candidatures: 48, offres: 18 },
    { month: 'Avr', candidatures: 61, offres: 22 },
    { month: 'Mai', candidatures: 55, offres: 19 },
    { month: 'Jun', candidatures: 68, offres: 25 }
  ];

  const recruitmentTimeData = [
    { category: 'Temps moyen', value: 28, unit: 'jours' },
    { category: 'Plus rapide', value: 12, unit: 'jours' },
    { category: 'Plus long', value: 65, unit: 'jours' }
  ];

  const candidateSourcesData = [
    { source: 'Site carrière', percentage: 45 },
    { source: 'LinkedIn', percentage: 30 },
    { source: 'Indeed', percentage: 25 }
  ];

  const satisfactionData = [
    { category: 'Candidats', score: 4.2 },
    { category: 'Recruteurs', score: 4.5 },
    { category: 'Managers', score: 4.1 }
  ];

  const statusDistribution = [
    { name: 'Candidatures reçues', value: 63, color: '#3B82F6' },
    { name: 'Entretiens programmés', value: 25, color: '#10B981' },
    { name: 'Offres envoyées', value: 9, color: '#F59E0B' },
    { name: 'Embauches', value: 4, color: '#EF4444' }
  ];

  const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => (
    <div className={`${color} rounded-2xl p-6 text-white relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/90 text-sm font-medium">{title}</h3>
        <Icon className="w-6 h-6 text-white/80" />
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold">{value}</div>
        <div className="flex items-center text-sm">
          {changeType === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          <span>{change}</span>
        </div>
      </div>
      <div className="absolute -right-6 -bottom-6 opacity-10">
        <Icon className="w-24 h-24" />
      </div>
    </div>
  );

  const MetricCard = ({ title, subtitle, data, renderContent }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
      {renderContent(data)}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <BarChart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
              <p className="text-gray-600">RecrutPro</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option>Ce mois</option>
              <option>3 derniers mois</option>
              <option>6 derniers mois</option>
              <option>Cette année</option>
            </select>
            <button className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-2">
              <span>PDF</span>
            </button>
            <button className="px-6 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-2">
              <span>Excel</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Offres actives"
            value="25"
            change="+12% vs mois dernier"
            changeType="up"
            icon={Briefcase}
            color="bg-gradient-to-br from-blue-500 to-blue-700"
          />
          <StatCard
            title="Candidatures"
            value="320"
            change="+8% vs mois dernier"
            changeType="up"
            icon={Users}
            color="bg-gradient-to-br from-green-500 to-green-700"
          />
          <StatCard
            title="Taux de conversion"
            value="5,6%"
            change="-2% vs mois dernier"
            changeType="down"
            icon={Target}
            color="bg-gradient-to-br from-orange-500 to-red-600"
          />
          <StatCard
            title="Durée moyenne"
            value="28j"
            change="-3j vs mois dernier"
            changeType="down"
            icon={Clock}
            color="bg-gradient-to-br from-purple-500 to-purple-700"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8 w-fit">
          {['Vue d\'ensemble', 'Conversion', 'Départements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Evolution Chart */}
          <MetricCard
            title="Évolution des candidatures"
            subtitle="Nombre de candidatures et d'offres par mois"
            data={monthlyData}
            renderContent={(data) => (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Line
                      type="monotone"
                      dataKey="candidatures"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="offres"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          />

          {/* Status Distribution */}
          <MetricCard
            title="Répartition par statut"
            subtitle="Distribution des candidatures par statut"
            data={statusDistribution}
            renderContent={(data) => (
              <div className="h-80 flex items-center">
                <div className="w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2 space-y-4">
                  {data.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-lg font-bold" style={{ color: item.color }}>{item.value}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recruitment Time */}
          <div className="bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-semibold">Temps de recrutement</h3>
            </div>
            <div className="space-y-4">
              {recruitmentTimeData.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                  <span className="text-white/90">{item.category}</span>
                  <span className="font-bold">{item.value} {item.unit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Candidate Sources */}
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-semibold">Sources de candidatures</h3>
            </div>
            <div className="space-y-4">
              {candidateSourcesData.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                  <span className="text-white/90">{item.source}</span>
                  <span className="font-bold">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Satisfaction */}
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-semibold">Satisfaction</h3>
            </div>
            <div className="space-y-4">
              {satisfactionData.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                  <span className="text-white/90">{item.category}</span>
                  <span className="font-bold">{item.score}/5</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDashboard;