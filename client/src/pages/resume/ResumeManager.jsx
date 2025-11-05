import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DocumentTextIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  RocketLaunchIcon,
  StarIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  UserCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const ResumeManager = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('modern')

  // Mock resume data
  const resumes = [
    {
      id: 1,
      name: 'Software Engineer Resume',
      template: 'modern',
      lastModified: '2024-11-03',
      status: 'active',
      aiScore: 92,
      targetRole: 'Software Engineer',
      company: 'Google, Microsoft',
      keywords: ['React', 'Node.js', 'Python', 'AWS'],
      downloadCount: 15,
      applicationCount: 8
    },
    {
      id: 2,
      name: 'Frontend Developer CV',
      template: 'creative',
      lastModified: '2024-11-01',
      status: 'draft',
      aiScore: 87,
      targetRole: 'Frontend Developer',
      company: 'Meta, Netflix',
      keywords: ['JavaScript', 'React', 'CSS', 'UI/UX'],
      downloadCount: 7,
      applicationCount: 3
    },
    {
      id: 3,
      name: 'Full Stack Resume',
      template: 'professional',
      lastModified: '2024-10-28',
      status: 'active',
      aiScore: 95,
      targetRole: 'Full Stack Developer',
      company: 'Amazon, Spotify',
      keywords: ['MERN Stack', 'PostgreSQL', 'Docker'],
      downloadCount: 22,
      applicationCount: 12
    }
  ]

  const templates = [
    { id: 'modern', name: 'Modern', preview: '📄', color: 'bg-blue-500' },
    { id: 'creative', name: 'Creative', preview: '🎨', color: 'bg-purple-500' },
    { id: 'professional', name: 'Professional', preview: '💼', color: 'bg-gray-600' },
    { id: 'minimalist', name: 'Minimalist', preview: '⚪', color: 'bg-green-500' }
  ]

  const handleCreateResume = () => {
    navigate('/resume/create')
  }

  const handleUploadResume = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      console.log('Uploaded file:', file.name)
      // Handle file upload logic
    }
  }

  const handleResumeAction = (action, resumeId) => {
    switch (action) {
      case 'view':
        navigate(`/resume/view/${resumeId}`)
        break
      case 'edit':
        navigate(`/resume/edit/${resumeId}`)
        break
      case 'delete':
        console.log('Delete resume:', resumeId)
        break
      case 'download':
        console.log('Download resume:', resumeId)
        break
      case 'ai-optimize':
        navigate(`/resume/ai-optimize/${resumeId}`)
        break
      default:
        break
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 75) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Resume Manager</h1>
              <p className="text-gray-400">Manage your AI-powered resumes and optimize for success</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleUploadResume}
                className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Upload Resume
              </button>
              <button
                onClick={handleCreateResume}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create New Resume
              </button>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-500">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Total Resumes</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-500">
                <RocketLaunchIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Applications</p>
                <p className="text-2xl font-bold text-white">47</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-500">
                <StarIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Avg AI Score</p>
                <p className="text-2xl font-bold text-white">91%</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-500">
                <CheckCircleIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-white">73%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Choose Template</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-2xl">{template.preview}</span>
                </div>
                <p className="text-white font-medium">{template.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Resume List */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Your Resumes</h2>
          </div>

          <div className="p-6">
            {resumes.map((resume) => (
              <div key={resume.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg mb-4 last:mb-0">
                {/* Resume Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-16 bg-gradient-to-b from-gray-600 to-gray-700 rounded flex items-center justify-center">
                      <DocumentTextIcon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-white font-semibold">{resume.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(resume.status)}`}>
                          {resume.status}
                        </span>
                        <div className="flex items-center space-x-1">
                          <StarIcon className={`h-4 w-4 ${getScoreColor(resume.aiScore)}`} />
                          <span className={`text-sm font-medium ${getScoreColor(resume.aiScore)}`}>
                            {resume.aiScore}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                        <div className="flex items-center">
                          <BriefcaseIcon className="h-4 w-4 mr-1" />
                          {resume.targetRole}
                        </div>
                        <div className="flex items-center">
                          <CalendarDaysIcon className="h-4 w-4 mr-1" />
                          {resume.lastModified}
                        </div>
                        <div className="flex items-center">
                          <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                          {resume.downloadCount} downloads
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {resume.keywords.slice(0, 3).map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs">
                            {keyword}
                          </span>
                        ))}
                        {resume.keywords.length > 3 && (
                          <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs">
                            +{resume.keywords.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleResumeAction('ai-optimize', resume.id)}
                    className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                    title="AI Optimize"
                  >
                    <RocketLaunchIcon className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleResumeAction('view', resume.id)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    title="View"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleResumeAction('edit', resume.id)}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    title="Edit"
                  >
                    <PencilSquareIcon className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleResumeAction('download', resume.id)}
                    className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                    title="Download"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleResumeAction('delete', resume.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    title="Delete"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-500 rounded-lg">
              <ExclamationTriangleIcon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">AI Optimization Tips</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-300">• Use industry-specific keywords</p>
              <p className="text-sm text-gray-300">• Quantify your achievements</p>
              <p className="text-sm text-gray-300">• Keep formatting consistent</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">• Tailor for each job application</p>
              <p className="text-sm text-gray-300">• Include relevant skills</p>
              <p className="text-sm text-gray-300">• Optimize for ATS systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeManager