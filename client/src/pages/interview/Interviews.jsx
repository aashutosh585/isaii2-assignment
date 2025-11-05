import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MagnifyingGlassIcon,
  BookmarkIcon,
  CalendarDaysIcon,
  TrophyIcon,
  AcademicCapIcon,
  ClockIcon,
  StarIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

const Interviews = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data for the PrepDash interface
  const stats = [
    { title: 'Total Interviews', value: '24', icon: BookmarkIcon, color: 'bg-blue-500' },
    { title: 'This Week', value: '5', icon: CalendarDaysIcon, color: 'bg-green-500' },
    { title: 'Success Rate', value: '85%', icon: TrophyIcon, color: 'bg-purple-500' },
    { title: 'Skills Practiced', value: '12', icon: AcademicCapIcon, color: 'bg-orange-500' }
  ]

  const interviews = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer',
      difficulty: 'Hard',
      duration: '45 min',
      rating: 4.8,
      topics: ['Algorithms', 'System Design', 'Coding'],
      logo: '🔍',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      company: 'Meta',
      position: 'Frontend Developer',
      difficulty: 'Medium',
      duration: '30 min',
      rating: 4.6,
      topics: ['React', 'JavaScript', 'CSS'],
      logo: '📱',
      gradient: 'from-blue-600 to-cyan-500'
    },
    {
      id: 3,
      company: 'Amazon',
      position: 'Backend Engineer',
      difficulty: 'Hard',
      duration: '60 min',
      rating: 4.7,
      topics: ['System Design', 'AWS', 'Databases'],
      logo: '📦',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 4,
      company: 'Microsoft',
      position: 'Full Stack Developer',
      difficulty: 'Medium',
      duration: '40 min',
      rating: 4.5,
      topics: ['C#', 'Azure', 'APIs'],
      logo: '💻',
      gradient: 'from-green-500 to-blue-600'
    },
    {
      id: 5,
      company: 'Netflix',
      position: 'Data Engineer',
      difficulty: 'Hard',
      duration: '50 min',
      rating: 4.9,
      topics: ['Big Data', 'Python', 'ML'],
      logo: '🎬',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      id: 6,
      company: 'Spotify',
      position: 'Mobile Developer',
      difficulty: 'Medium',
      duration: '35 min',
      rating: 4.4,
      topics: ['iOS', 'Android', 'Swift'],
      logo: '🎵',
      gradient: 'from-green-400 to-green-600'
    }
  ]

  const handleInterviewClick = (interviewId) => {
    navigate(`/interview-detail/${interviewId}`)
  }

  const handleAddInterview = () => {
    // Handle add interview logic
    console.log('Add new interview')
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Interview Preparations</h1>
          <button
            onClick={handleAddInterview}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Interview
          </button>
        </div>

        {/* Interview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews
            .filter(interview =>
              interview.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
              interview.position.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((interview) => (
              <div
                key={interview.id}
                onClick={() => handleInterviewClick(interview.id)}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-200 cursor-pointer transform hover:scale-105"
              >
                {/* Card Header with Gradient */}
                <div className={`h-32 bg-gradient-to-r ${interview.gradient} flex items-center justify-center`}>
                  <span className="text-4xl">{interview.logo}</span>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">{interview.company}</h3>
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-300">{interview.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{interview.position}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {interview.duration}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      interview.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      interview.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {interview.difficulty}
                    </span>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2">
                    {interview.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {interviews
          .filter(interview =>
            interview.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            interview.position.toLowerCase().includes(searchQuery.toLowerCase())
          ).length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MagnifyingGlassIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No interviews found</h3>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Interviews