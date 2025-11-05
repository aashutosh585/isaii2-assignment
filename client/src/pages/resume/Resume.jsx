import { useState, useEffect } from 'react'
import { resumeAPI } from '../../services/api'
import toast from 'react-hot-toast'
import {
  DocumentTextIcon,
  CloudArrowUpIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  TrashIcon,
  PlusIcon,
  UserIcon,
  EnvelopeIcon,
  LinkIcon,
  PhoneIcon,
  SparklesIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const Resume = () => {
  const [resumes, setResumes] = useState([])
  const [selectedResume, setSelectedResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [editingSection, setEditingSection] = useState(null)
  const [editingData, setEditingData] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getResumes()
      setResumes(response.data.resumes || [])
    } catch (error) {
      toast.error('Failed to fetch resumes')
      console.error('Fetch resumes error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      toast.error('Please upload a PDF or Word document')
      return
    }

    const formData = new FormData()
    formData.append('resume', file)

    setUploading(true)
    try {
      const response = await resumeAPI.uploadResume(formData)
      toast.success('Resume uploaded and parsed successfully!')
      fetchResumes()
      setSelectedResume(response.data.resume)
    } catch (error) {
      toast.error('Failed to upload resume')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteResume = async (resumeId) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return

    try {
      await resumeAPI.deleteResume(resumeId)
      toast.success('Resume deleted successfully')
      fetchResumes()
      if (selectedResume?._id === resumeId) {
        setSelectedResume(null)
      }
    } catch (error) {
      toast.error('Failed to delete resume')
      console.error('Delete error:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedResume) return

    setChatLoading(true)
    try {
      const response = await resumeAPI.chatWithAI(selectedResume._id, newMessage)
      
      const updatedMessages = [
        ...chatMessages,
        { userMessage: newMessage, aiResponse: response.data.message, timestamp: new Date() }
      ]
      setChatMessages(updatedMessages)
      setNewMessage('')
    } catch (error) {
      toast.error('Failed to send message')
      console.error('Chat error:', error)
    } finally {
      setChatLoading(false)
    }
  }

  const handleAnalyzeResume = async () => {
    if (!selectedResume) return

    setAnalyzing(true)
    try {
      const response = await resumeAPI.analyzeResume(selectedResume._id)
      setAiAnalysis(response.data.analysis)
      toast.success('AI analysis completed!')
    } catch (error) {
      toast.error('Failed to analyze resume')
      console.error('Analysis error:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleEditSection = (sectionName) => {
    setEditingSection(sectionName)
    setEditingData([...selectedResume[sectionName]])
  }

  const handleCancelEdit = () => {
    setEditingSection(null)
    setEditingData([])
  }

  const handleSaveSection = async () => {
    if (!selectedResume || !editingSection) return

    setSaving(true)
    try {
      const response = await resumeAPI.updateResumeSection(
        selectedResume._id, 
        editingSection, 
        editingData
      )
      
      setSelectedResume(response.data.resume)
      setEditingSection(null)
      setEditingData([])
      toast.success('Section updated successfully!')
      
      // Refresh resumes list to show updated ATS score
      fetchResumes()
    } catch (error) {
      toast.error('Failed to update section')
      console.error('Section update error:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleAddField = () => {
    setEditingData([...editingData, { key: '', value: '' }])
  }

  const handleRemoveField = (index) => {
    const newData = editingData.filter((_, i) => i !== index)
    setEditingData(newData)
  }

  const handleFieldChange = (index, field, value) => {
    const newData = [...editingData]
    newData[index][field] = value
    setEditingData(newData)
  }

  const getPersonalInfoValue = (key) => {
    if (!selectedResume?.personalInfo || !Array.isArray(selectedResume.personalInfo)) return ''
    const info = selectedResume.personalInfo.find(item => item.key === key)
    return info ? info.value : ''
  }

  const getIconForKey = (key) => {
    switch (key) {
      case 'name': return <UserIcon className="h-4 w-4" />
      case 'email': return <EnvelopeIcon className="h-4 w-4" />
      case 'phone': return <PhoneIcon className="h-4 w-4" />
      default: return <LinkIcon className="h-4 w-4" />
    }
  }

  const renderEditableSection = (sectionName, sectionTitle, sectionData) => {
    const isEditing = editingSection === sectionName

    if (isEditing) {
      return (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-white">{sectionTitle}</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveSection}
                disabled={saving}
                className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-sm rounded transition-colors"
              >
                <CheckIcon className="h-4 w-4" />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={saving}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
              >
                <XMarkIcon className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
          <div className="bg-gray-700/30 p-4 rounded-lg space-y-3">
            {editingData.map((item, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  value={item.key}
                  onChange={(e) => handleFieldChange(index, 'key', e.target.value)}
                  placeholder="Field name (e.g., company, project)"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                />
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="flex-2 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                />
                <button
                  onClick={() => handleRemoveField(index)}
                  className="px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={handleAddField}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add Field</span>
            </button>
          </div>
        </div>
      )
    }

    // Regular display mode
    if (sectionData && sectionData.length > 0) {
      return (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-white">{sectionTitle}</h3>
            <button
              onClick={() => handleEditSection(sectionName)}
              className="flex items-center space-x-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              <PencilIcon className="h-4 w-4" />
              <span>Edit</span>
            </button>
          </div>
          <div className="bg-gray-700/30 p-4 rounded-lg space-y-2">
            {sectionData.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="text-blue-400 mt-1">•</div>
                <div>
                  <span className="text-gray-400 text-sm capitalize">{item.key}:</span>
                  <span className="text-white ml-2">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Your Resume</h1>
          <p className="text-gray-400">Upload, analyze and get AI-powered suggestions for your resume</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="btn-primary cursor-pointer flex items-center space-x-2">
            <CloudArrowUpIcon className="h-5 w-5" />
            <span>{uploading ? 'Uploading...' : 'Upload Resume'}</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold text-white mb-4">Your Resumes</h2>
            
            {resumes.length === 0 ? (
              <div className="text-center py-8">
                <DocumentTextIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No resumes uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedResume?._id === resume._id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => {
                      setSelectedResume(resume)
                      setChatMessages(resume.aiChatHistory || [])
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <DocumentTextIcon className="h-8 w-8 text-blue-400" />
                        <div>
                          <p className="font-medium text-white truncate">
                            {resume.fileName || 'Untitled Resume'}
                          </p>
                          <p className="text-sm text-gray-400">
                            ATS Score: {resume.atsScore || 0}/100
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteResume(resume._id)
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Resume Preview */}
        <div className="lg:col-span-2">
          {selectedResume ? (
            <div className="space-y-6">
              {/* Resume Preview */}
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Resume Preview</h2>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleAnalyzeResume}
                      disabled={analyzing}
                      className="flex items-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                    >
                      <SparklesIcon className="h-4 w-4" />
                      <span>{analyzing ? 'Analyzing...' : 'AI Analysis'}</span>
                    </button>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedResume.atsScore >= 80 ? 'bg-green-500/20 text-green-400' :
                      selectedResume.atsScore >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      ATS Score: {selectedResume.atsScore || 0}/100
                    </span>
                  </div>
                </div>

                {/* Personal Information */}
                {selectedResume.personalInfo && selectedResume.personalInfo.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-3">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedResume.personalInfo.map((info, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                          <div className="text-blue-400">
                            {getIconForKey(info.key)}
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 capitalize">{info.key}</p>
                            <p className="text-white">{info.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resume Sections */}
                <div className="space-y-6">
                  {renderEditableSection('experience', 'Experience', selectedResume.experience)}
                  {renderEditableSection('education', 'Education', selectedResume.education)}
                  {renderEditableSection('projects', 'Projects', selectedResume.projects)}
                  {renderEditableSection('extraData', 'Skills & Additional Info', selectedResume.extraData)}
                </div>
              </div>

              {/* AI Analysis */}
              {aiAnalysis && (
                <div className="card">
                  <div className="flex items-center space-x-2 mb-4">
                    <SparklesIcon className="h-6 w-6 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">AI Analysis Results</h3>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <pre className="text-gray-300 whitespace-pre-wrap text-sm">{aiAnalysis}</pre>
                  </div>
                </div>
              )}

              {/* AI Chat */}
              <div className="card">
                <div className="flex items-center space-x-2 mb-4">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">PrepAI Assistant</h3>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                  {chatMessages.length === 0 ? (
                    <p className="text-gray-400 text-center">Ask me anything about your resume!</p>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-end">
                            <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                              {msg.userMessage}
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs">
                              {msg.aiResponse}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about your resume..."
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={chatLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={chatLoading || !newMessage.trim()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    {chatLoading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <DocumentTextIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No Resume Selected</h3>
                <p className="text-gray-400">Upload or select a resume to view and analyze it</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Resume