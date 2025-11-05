import React, { useState } from 'react'
import {
  XMarkIcon,
  PaperAirplaneIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

const ResumeEditor = () => {
  const [chatMessage, setChatMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: "Hello! I'm here to help. I see you have your resume open. How can I assist you today?"
    }
  ])

  const quickActions = [
    "Review my resume for ATS keywords",
    "Make my resume 1-page", 
    "Explain pointers for an interview",
    "Give a STAR method example",
    "Suggest stronger action verbs"
  ]

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    // Add user message
    setChatHistory(prev => [...prev, {
      type: 'user',
      message: chatMessage
    }])

    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'ai',
        message: "I'll help you with that! Let me analyze your resume and provide specific recommendations..."
      }])
    }, 1000)

    setChatMessage('')
  }

  const handleQuickAction = (action) => {
    setChatMessage(action)
    handleSendMessage()
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Main Resume Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Resume Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Resume - V2</h1>
            <p className="text-gray-400">Software Development Engineer</p>
          </div>

          {/* Resume Content */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            {/* Personal Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Alex Johnson</h2>
              <p className="text-lg text-gray-700 mb-6">Software Development Engineer</p>
              
              <div className="prose text-gray-700 leading-relaxed">
                A skilled and motivated Software Development Engineer with a strong background in building scalable web applications and distributed systems. Proficient in Python, Java, and JavaScript, with hands-on experience in cloud technologies like AWS and containerization with Docker. A quick learner and team player, passionate about solving complex problems and delivering high-quality software.
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">Experience</h3>
              
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">Software Engineer Intern</h4>
                  <span className="text-gray-600 font-medium">Tech Solutions Inc. - Summer 2023</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Developed and maintained microservices for a large-scale e-commerce platform, improving API response times by 15%.</li>
                  <li>Collaborated with a cross-functional team of 5 to design and implement a new feature for real-time inventory tracking, reducing stock discrepancies by 25%.</li>
                </ul>
              </div>
            </div>

            {/* Projects Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">Projects</h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Distributed Task Scheduler</h4>
                <p className="text-gray-700">
                  Built a fault-tolerant task scheduling system using Go and RabbitMQ, capable of handling over 10,000 tasks per minute.
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Java', 'JavaScript', 'React', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'Git'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">Education</h3>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Bachelor of Science in Computer Science</h4>
                <p className="text-gray-600">University of Technology • 2020-2024 • GPA: 3.8/4.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">PrepAI Assistant</h3>
          <button className="text-gray-400 hover:text-white">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-400 mb-3">Quick actions:</p>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Analysis Status */}
          <div className="mt-6 p-3 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Analyzing your open resume: V2...</p>
            <div className="w-full bg-gray-600 rounded-full h-1">
              <div className="bg-blue-500 h-1 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask PrepAI..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
            >
              <PaperAirplaneIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeEditor