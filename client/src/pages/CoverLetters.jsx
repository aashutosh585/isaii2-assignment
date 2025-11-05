import { useState } from 'react'
import {
  EnvelopeIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'

const CoverLetters = () => {
  const [coverLetters, setCoverLetters] = useState([
    {
      id: 1,
      title: 'Software Engineer - Google',
      company: 'Google',
      position: 'Software Engineer',
      status: 'draft',
      lastModified: '2024-01-15',
      preview: 'Dear Hiring Manager, I am writing to express my interest in the Software Engineer position at Google...'
    },
    {
      id: 2,
      title: 'Frontend Developer - Meta',
      company: 'Meta',
      position: 'Frontend Developer',
      status: 'completed',
      lastModified: '2024-01-14',
      preview: 'Dear Hiring Team, I am excited to apply for the Frontend Developer role at Meta...'
    },
    {
      id: 3,
      title: 'Full Stack Engineer - Netflix',
      company: 'Netflix',
      position: 'Full Stack Engineer',
      status: 'sent',
      lastModified: '2024-01-12',
      preview: 'Dear Netflix Team, I am thrilled to submit my application for the Full Stack Engineer position...'
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-yellow-600 text-yellow-100'
      case 'completed': return 'bg-green-600 text-green-100'
      case 'sent': return 'bg-blue-600 text-blue-100'
      default: return 'bg-gray-600 text-gray-100'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Cover Letters</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <PlusIcon className="h-5 w-5" />
          <span>Create New Cover Letter</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Total Letters</h3>
          <p className="text-3xl font-bold text-white">3</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Drafts</h3>
          <p className="text-3xl font-bold text-yellow-400">1</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-400">1</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Sent</h3>
          <p className="text-3xl font-bold text-blue-400">1</p>
        </div>
      </div>

      {/* Cover Letters List */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Your Cover Letters</h2>
        </div>
        
        <div className="divide-y divide-gray-700">
          {coverLetters.map(letter => (
            <div key={letter.id} className="p-6 hover:bg-gray-750 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{letter.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(letter.status)}`}>
                      {letter.status.charAt(0).toUpperCase() + letter.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <span>Company: {letter.company}</span>
                    <span>Position: {letter.position}</span>
                    <span>Modified: {letter.lastModified}</span>
                  </div>
                  
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {letter.preview}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 ml-6">
                  <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-400 transition-colors">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                    <DocumentDuplicateIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Templates Section */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Cover Letter Templates</h2>
          <p className="text-gray-400 mt-1">Choose from professional templates to get started</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Professional', 'Creative', 'Technical'].map((template, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-6 border border-gray-600 hover:border-gray-500 transition-colors cursor-pointer">
                <div className="bg-gray-600 rounded h-32 mb-4 flex items-center justify-center">
                  <EnvelopeIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{template}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Perfect for {template.toLowerCase()} roles and industries
                </p>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoverLetters