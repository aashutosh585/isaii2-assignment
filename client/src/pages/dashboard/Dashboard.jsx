import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useDashboardData } from '../../hooks/useDashboardData'
import {
  PlusIcon,
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'

const Dashboard = () => {
  const { user } = useAuth()
  const { stats, recentInterviews, isLoading, error } = useDashboardData()



  const getStatusColor = (status) => {
    switch (status) {
      case 'passed':
        return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'failed':
        return 'text-red-400 bg-red-400/10 border-red-400/20'
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'scheduled':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400'
      case 'Medium':
        return 'text-yellow-400'
      case 'Hard':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
          </h1>
          <p className="text-gray-400 mt-1">Ready to ace your next interview?</p>
        </div>
        <Link
          to="/app/interviews"
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Interview</span>
        </Link>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <BriefcaseIcon className="h-8 w-8 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Recent Interviews</p>
              <p className="text-2xl font-bold text-white">{stats.recentInterviews}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <CalendarIcon className="h-8 w-8 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Upcoming Mock</p>
              <p className="text-lg font-bold text-white">{stats.upcomingMock}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <TrophyIcon className="h-8 w-8 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Latest Score</p>
              <p className="text-2xl font-bold text-white">{stats.latestScore}%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <ChartBarIcon className="h-8 w-8 text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Tests Completed</p>
              <p className="text-2xl font-bold text-white">{stats.completedTests}</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Interviews Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">My Interviews</h2>
          <Link
            to="/app/interviews"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {recentInterviews.map((interview) => (
            <div
              key={interview._id || interview.id}
              className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {interview.company.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{interview.role}</h3>
                  <p className="text-sm text-gray-400">
                    {interview.company} • {new Date(interview.scheduledDate || interview.date).toLocaleDateString()}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-green-400 font-medium">
                      {interview.expectedPackage || interview.package}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className={`text-sm font-medium ${getDifficultyColor(interview.difficulty)}`}>
                      {interview.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(interview.status)}`}>
                  {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                </span>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <ChartBarIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/app/practice" className="card hover:bg-gray-700/50 transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                Start Practice
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Choose from Aptitude, Coding, or HR rounds
              </p>
            </div>
            <ArrowTrendingUpIcon className="h-6 w-6 text-blue-400" />
          </div>
        </Link>

        <Link to="/app/resume" className="card hover:bg-gray-700/50 transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                Review Resume
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Get AI-powered suggestions for improvement
              </p>
            </div>
            <DocumentTextIcon className="h-6 w-6 text-purple-400" />
          </div>
        </Link>

        <Link to="/app/curriculum" className="card hover:bg-gray-700/50 transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors">
                Learning Path
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Follow structured curriculum for success
              </p>
            </div>
            <BookOpenIcon className="h-6 w-6 text-green-400" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard