import { useState } from 'react'
import {
  ChartBarIcon,
  EyeIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30days')

  const stats = {
    totalViews: 1247,
    downloads: 89,
    applications: 24,
    interviews: 8,
    responseRate: 33.3
  }

  const recentActivity = [
    { type: 'view', company: 'Google', date: '2024-01-15', details: 'Resume viewed' },
    { type: 'download', company: 'Microsoft', date: '2024-01-14', details: 'Resume downloaded' },
    { type: 'application', company: 'Meta', date: '2024-01-13', details: 'Application submitted' },
    { type: 'interview', company: 'Netflix', date: '2024-01-12', details: 'Interview scheduled' },
    { type: 'view', company: 'Apple', date: '2024-01-11', details: 'Resume viewed' },
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'view': return <EyeIcon className="h-4 w-4" />
      case 'download': return <DocumentTextIcon className="h-4 w-4" />
      case 'application': return <EnvelopeIcon className="h-4 w-4" />
      case 'interview': return <BriefcaseIcon className="h-4 w-4" />
      default: return <ChartBarIcon className="h-4 w-4" />
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'view': return 'text-blue-400 bg-blue-900'
      case 'download': return 'text-green-400 bg-green-900'
      case 'application': return 'text-purple-400 bg-purple-900'
      case 'interview': return 'text-yellow-400 bg-yellow-900'
      default: return 'text-gray-400 bg-gray-900'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
          <option value="1year">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Views</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">{stats.totalViews}</p>
            </div>
            <div className="p-3 bg-blue-900 rounded-lg">
              <EyeIcon className="h-6 w-6 text-blue-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-400 text-sm font-medium">+12%</span>
            <span className="text-gray-400 text-sm ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Downloads</p>
              <p className="text-3xl font-bold text-green-400 mt-2">{stats.downloads}</p>
            </div>
            <div className="p-3 bg-green-900 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-green-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-400 text-sm font-medium">+8%</span>
            <span className="text-gray-400 text-sm ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Applications</p>
              <p className="text-3xl font-bold text-purple-400 mt-2">{stats.applications}</p>
            </div>
            <div className="p-3 bg-purple-900 rounded-lg">
              <EnvelopeIcon className="h-6 w-6 text-purple-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-400 text-sm font-medium">+15%</span>
            <span className="text-gray-400 text-sm ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Interviews</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.interviews}</p>
            </div>
            <div className="p-3 bg-yellow-900 rounded-lg">
              <BriefcaseIcon className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-400 text-sm font-medium">+25%</span>
            <span className="text-gray-400 text-sm ml-2">vs last month</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Response Rate</p>
              <p className="text-3xl font-bold text-orange-400 mt-2">{stats.responseRate}%</p>
            </div>
            <div className="p-3 bg-orange-900 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-orange-400" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-400 text-sm font-medium">+5%</span>
            <span className="text-gray-400 text-sm ml-2">vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resume Views Chart */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6">Resume Views Over Time</h3>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Chart visualization would be here</p>
          </div>
        </div>

        {/* Application Success Rate */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-6">Application Success Rate</h3>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Pie chart visualization would be here</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{activity.company}</p>
                      <p className="text-gray-400 text-sm">{activity.details}</p>
                    </div>
                    <p className="text-gray-400 text-sm">{activity.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Top Performing Resumes</h3>
          <div className="space-y-3">
            {[
              { name: 'Software Engineer Resume', views: 324, downloads: 45 },
              { name: 'Product Manager Resume', views: 298, downloads: 38 },
              { name: 'Data Scientist Resume', views: 267, downloads: 32 }
            ].map((resume, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-medium">{resume.name}</p>
                  <p className="text-gray-400 text-sm">{resume.views} views • {resume.downloads} downloads</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Companies Showing Interest</h3>
          <div className="space-y-3">
            {[
              { name: 'Google', interactions: 12, type: 'High Interest' },
              { name: 'Microsoft', interactions: 8, type: 'Medium Interest' },
              { name: 'Meta', interactions: 6, type: 'Medium Interest' }
            ].map((company, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-medium">{company.name}</p>
                  <p className="text-gray-400 text-sm">{company.interactions} interactions • {company.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics