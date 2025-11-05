import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

const Interviews = () => {
  const navigate = useNavigate()
  const [interviews, setInterviews] = useState([])
  const [filters, setFilters] = useState({
    role: 'all',
    dateRange: 'all',
    package: 'all'
  })

  useEffect(() => {
    // Mock data matching the PrepDash interface
    setInterviews([
      {
        id: 1,
        role: 'Software Engineer Intern',
        company: 'Google',
        date: '15 Dec 2023',
        salary: '$120k',
        status: 'On-campus',
        category: 'SDE',
        gradient: 'from-orange-200 to-yellow-200',
        applied: true
      },
      {
        id: 2,
        role: 'Product Manager',
        company: 'Microsoft',
        date: '18 Dec 2023',
        salary: '$110k',
        status: 'Applied',
        category: 'QA',
        gradient: 'from-blue-200 to-cyan-200',
        applied: true
      },
      {
        id: 3,
        role: 'Data Analyst',
        company: 'Amazon',
        date: '20 Dec 2023',
        salary: '$95k',
        status: 'Technical Round',
        category: 'Technical Round',
        gradient: 'from-green-200 to-lime-200',
        applied: false
      },
      {
        id: 4,
        role: 'UX Designer',
        company: 'Figma',
        date: '22 Dec 2023',
        salary: '$105k',
        status: 'Off-campus',
        category: 'Design',
        gradient: 'from-purple-200 to-blue-200',
        applied: false
      }
    ])
  }, [])

  const handleStartInterview = (interviewId) => {
    navigate(`/interview-detail/${interviewId}`)
  }

  const handleAddInterview = () => {
    // Handle add interview logic
    console.log('Add new interview')
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <span className="text-xl font-bold">PrepDash</span>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-lg mx-8">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search companies, roles..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <BellIcon className="h-6 w-6" />
                </button>
                <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <UserCircleIcon className="h-8 w-8" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Recent Interviews</div>
              <div className="text-3xl font-bold mb-2">5</div>
              <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                View All
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Upcoming Mock</div>
              <div className="text-3xl font-bold mb-2">Dec 15, 2023</div>
              <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                View Schedule
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Latest Score</div>
              <div className="text-3xl font-bold mb-2">89%</div>
              <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                View Report
              </button>
            </div>
          </div>

          {/* My Interviews Section */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Interviews</h2>
                <button
                  onClick={handleAddInterview}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add Interview</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4 mt-6">
                <div className="relative">
                  <select
                    value={filters.role}
                    onChange={(e) => handleFilterChange('role', e.target.value)}
                    className="appearance-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Role</option>
                    <option value="sde">SDE</option>
                    <option value="pm">Product Manager</option>
                    <option value="design">Design</option>
                    <option value="data">Data</option>
                  </select>
                  <ChevronDownIcon className="h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="appearance-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Date Range</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="next-month">Next Month</option>
                  </select>
                  <ChevronDownIcon className="h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={filters.package}
                    onChange={(e) => handleFilterChange('package', e.target.value)}
                    className="appearance-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Package</option>
                    <option value="100k+">$100k+</option>
                    <option value="120k+">$120k+</option>
                    <option value="150k+">$150k+</option>
                  </select>
                  <ChevronDownIcon className="h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Interview Cards Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {interviews.map((interview) => (
                  <div key={interview.id} className="bg-gray-700 rounded-xl overflow-hidden border border-gray-600 hover:border-gray-500 transition-all hover:shadow-lg">
                    {/* Card Header with Gradient */}
                    <div className={`h-24 bg-gradient-to-br ${interview.gradient}`}></div>
                    
                    {/* Card Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-1 truncate">
                        {interview.role}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{interview.company}</p>
                      <p className="text-gray-400 text-sm mb-3">{interview.date} - {interview.salary}</p>
                      
                      {/* Status Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          interview.status === 'On-campus' ? 'bg-blue-600 text-blue-100' :
                          interview.status === 'Applied' ? 'bg-green-600 text-green-100' :
                          interview.status === 'Technical Round' ? 'bg-yellow-600 text-yellow-100' :
                          'bg-purple-600 text-purple-100'
                        }`}>
                          {interview.status}
                        </span>
                        <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs font-medium">
                          {interview.category}
                        </span>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleStartInterview(interview.id)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span>Start Interview</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Interviews