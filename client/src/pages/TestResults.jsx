import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlayIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const TestResults = () => {
  const [activeTab, setActiveTab] = useState('analysis')

  // Mock test result data
  const testResult = {
    title: "Quantitative Aptitude Mock 1",
    overallScore: 180,
    maxScore: 200,
    percentile: 85,
    correctAnswers: 45,
    incorrectAnswers: 5,
    timeTaken: "55:20",
    performance: "Excellent Work!",
    message: "You're in the top tier of performers.",
    
    strengths: [
      { topic: "Percentages", score: 90 },
      { topic: "Profit & Loss", score: 85 },
      { topic: "Time & Work", score: 80 }
    ],
    
    weakAreas: [
      { topic: "Permutation & Combination", score: 30 },
      { topic: "Probability", score: 40 },
      { topic: "Mixtures & Allegations", score: 50 }
    ],
    
    recommendedVideos: [
      {
        id: 1,
        title: "Mastering Permutations",
        description: "Learn the fundamental concepts and solve common problems.",
        thumbnail: "/api/placeholder/150/100",
        duration: "12 mins"
      },
      {
        id: 2,
        title: "Introduction to Probability",
        description: "Build your probability theory with practical examples.",
        thumbnail: "/api/placeholder/150/100",
        duration: "15 mins"
      }
    ],
    
    nextSteps: [
      {
        title: "Topic Test: Permutations",
        description: "15 Questions • 20 Mins",
        difficulty: "MEDIUM",
        color: "orange"
      },
      {
        title: "Mixed Quiz: P&C, Probability",
        description: "25 Questions • 30 Mins",
        difficulty: "HARD",
        color: "red"
      }
    ]
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Test Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Test Results: {testResult.title}</h1>
        <p className="text-gray-400">Here's a detailed breakdown of your performance.</p>
      </div>

      {/* Main Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Overall Score */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-gray-400 text-sm mb-2">OVERALL SCORE</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-white">{testResult.overallScore}</span>
              <span className="text-gray-400 text-xl"> / {testResult.maxScore}</span>
            </div>
            <div className="mb-4">
              <p className="text-blue-400 font-medium">{testResult.performance}</p>
              <p className="text-gray-400 text-sm">{testResult.message}</p>
            </div>
          </div>
        </div>

        {/* Percentile Circle */}
        <div className="lg:col-span-1 flex items-center justify-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-700"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${testResult.percentile * 2.83} 283`}
                className="text-blue-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{testResult.percentile}%</div>
                <div className="text-gray-400 text-sm">Percentile</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card">
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Correct Answers</p>
                <p className="text-2xl font-bold text-green-400">{testResult.correctAnswers}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <XCircleIcon className="h-8 w-8 text-red-400" />
              <div>
                <p className="text-gray-400 text-sm">Incorrect Answers</p>
                <p className="text-2xl font-bold text-red-400">{testResult.incorrectAnswers}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3">
              <ClockIcon className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">Time Taken</p>
                <p className="text-2xl font-bold text-white">{testResult.timeTaken}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'analysis'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Analysis
        </button>
        <button
          onClick={() => setActiveTab('solutions')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'solutions'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Solutions
        </button>
      </div>

      {/* Analysis Tab Content */}
      {activeTab === 'analysis' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Your Strengths */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">Your Strengths</h3>
              <div className="space-y-4">
                {testResult.strengths.map((strength, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{strength.topic}</span>
                      <span className={getScoreColor(strength.score)}>{strength.score}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(strength.score)}`}
                        style={{ width: `${strength.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">Areas for Improvement</h3>
              <div className="space-y-4">
                {testResult.weakAreas.map((area, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{area.topic}</span>
                      <span className={getScoreColor(area.score)}>{area.score}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(area.score)}`}
                        style={{ width: `${area.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 btn-secondary">
                Practice Weak Topics
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recommended Learning Path */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">Recommended Learning Path</h3>
              <div className="space-y-4">
                {testResult.recommendedVideos.map((video) => (
                  <div key={video.id} className="flex space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                    <div className="w-16 h-12 bg-gray-600 rounded flex items-center justify-center">
                      <PlayIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{video.title}</h4>
                      <p className="text-sm text-gray-400">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors">
                Watch Suggested Videos
              </button>
            </div>

            {/* Next Practice Steps */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4">Next Practice Steps</h3>
              <div className="space-y-4">
                {testResult.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{step.title}</h4>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        step.difficulty === 'MEDIUM' ? 'bg-orange-600 text-white' :
                        step.difficulty === 'HARD' ? 'bg-red-600 text-white' :
                        'bg-green-600 text-white'
                      }`}>
                        {step.difficulty}
                      </span>
                      <ArrowRightIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Solutions Tab Content */}
      {activeTab === 'solutions' && (
        <div className="card">
          <h3 className="text-xl font-semibold text-white mb-4">Detailed Solutions</h3>
          <p className="text-gray-400 mb-4">
            Review detailed solutions for all questions. This feature will show step-by-step solutions,
            explanations, and alternative approaches for each question in the test.
          </p>
          <button className="btn-primary">
            View All Solutions
          </button>
        </div>
      )}
    </div>
  )
}

export default TestResults