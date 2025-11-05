import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  MicrophoneIcon,
  VideoCameraIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import {
  MicrophoneIcon as MicrophoneIconSolid,
  VideoCameraSlashIcon,
  PhoneXMarkIcon
} from '@heroicons/react/24/solid'
import { toast } from 'react-hot-toast'
import api from '../../services/api'

const AIInterview = () => {
  const { interviewId } = useParams()
  const navigate = useNavigate()
  
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions] = useState(5)
  const [isRecording, setIsRecording] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [currentQuestionText, setCurrentQuestionText] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [interviewData, setInterviewData] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [isAnswering, setIsAnswering] = useState(false)
  const [feedback, setFeedback] = useState(null)
  
  const videoRef = useRef(null)
  const mediaStreamRef = useRef(null)
  const answerStartTime = useRef(null)

  useEffect(() => {
    // Initialize camera and start interview
    initializeInterview()
    
    // Start timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleEndInterview()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const initializeInterview = async () => {
    try {
      // Initialize camera
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      mediaStreamRef.current = stream

      // Start interview session
      const response = await api.post(`/api/interviews/ai/${interviewId}/start`, {
        role: 'Software Engineer',
        company: 'TechCorp',
        difficulty: 'medium'
      })

      if (response.data.success) {
        setInterviewData(response.data.session)
        setCurrentQuestionText(response.data.session.currentQuestion.question)
        setTotalQuestions(response.data.session.totalQuestions)
      }
    } catch (error) {
      console.error('Error initializing interview:', error)
      toast.error('Failed to start interview')
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleToggleMute = () => {
    if (mediaStreamRef.current) {
      const audioTracks = mediaStreamRef.current.getAudioTracks()
      audioTracks.forEach(track => {
        track.enabled = isMuted
      })
      setIsMuted(!isMuted)
    }
  }

  const handleToggleVideo = () => {
    if (mediaStreamRef.current) {
      const videoTracks = mediaStreamRef.current.getVideoTracks()
      videoTracks.forEach(track => {
        track.enabled = isVideoOff
      })
      setIsVideoOff(!isVideoOff)
    }
  }

  const handleEndInterview = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
    }
    navigate('/app/interviews')
  }

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) {
      toast.error('Please provide an answer before submitting')
      return
    }

    setIsAnswering(true)
    const timeSpent = answerStartTime.current ? Date.now() - answerStartTime.current : 0

    try {
      const response = await api.post(`/api/interviews/ai/${interviewId}/answer`, {
        answer: userAnswer,
        timeSpent: Math.floor(timeSpent / 1000) // Convert to seconds
      })

      if (response.data.success) {
        setFeedback(response.data.feedback)
        
        if (response.data.hasMoreQuestions) {
          setCurrentQuestion(response.data.questionNumber)
          setCurrentQuestionText(response.data.nextQuestion.question)
          setUserAnswer('')
          answerStartTime.current = Date.now()
        } else {
          // Interview completed
          setTimeout(() => {
            handleEndInterview()
          }, 3000) // Show feedback for 3 seconds
        }
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      toast.error('Failed to submit answer')
    }
    
    setIsAnswering(false)
  }

  const startAnswering = () => {
    setIsAnswering(true)
    answerStartTime.current = Date.now()
    setIsRecording(true)
  }

  const stopAnswering = () => {
    setIsAnswering(false)
    setIsRecording(false)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">1-on-1 AI Interview</h1>
        </div>
        <button
          onClick={handleEndInterview}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          End
        </button>
      </div>

      {/* Timer and Progress */}
      <div className="px-4 py-2 bg-gray-900">
        <div className="flex items-center justify-between mb-2">
          <div className="text-red-400 font-medium">
            {formatTime(timeLeft)} left
          </div>
          <div className="text-gray-400">
            {currentQuestion}/{totalQuestions}
          </div>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* AI Interviewer Section */}
        <div className="lg:w-1/2 bg-gray-900 p-6 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-video bg-gray-800 rounded-lg overflow-hidden">
              {/* AI Interviewer Avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="w-28 h-28 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* AI Interviewer Label */}
              <div className="absolute bottom-4 left-4">
                <div className="bg-black bg-opacity-60 px-3 py-1 rounded text-sm">
                  AI Interviewer
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Video Section */}
        <div className="lg:w-1/2 bg-gray-800 p-6 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              
              {isVideoOff && (
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                  <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">You</span>
                  </div>
                </div>
              )}
              
              {/* User Label */}
              <div className="absolute bottom-4 left-4">
                <div className="bg-black bg-opacity-60 px-3 py-1 rounded text-sm">
                  You
                </div>
              </div>
              
              {/* Recording Indicator */}
              {isRecording && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-2 bg-red-600 px-2 py-1 rounded">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs">REC</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Question Section */}
      <div className="bg-gray-800 p-6 mx-6 mb-6 rounded-lg">
        <div className="text-gray-300 leading-relaxed text-lg mb-4">
          "{currentQuestionText}"
        </div>
        
        {/* Answer Input */}
        {isAnswering ? (
          <div className="space-y-4">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Speak your answer or type it here..."
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
              autoFocus
            />
            <div className="flex space-x-4">
              <button
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim()}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
              >
                Submit Answer
              </button>
              <button
                onClick={stopAnswering}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={startAnswering}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors font-medium"
          >
            Start Answering
          </button>
        )}

        {/* Feedback Display */}
        {feedback && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-lg font-semibold text-green-400 mb-2">
              Feedback (Score: {feedback.score}/10)
            </h4>
            <p className="text-gray-300 mb-3">{feedback.summary}</p>
            
            {feedback.strengths.length > 0 && (
              <div className="mb-3">
                <h5 className="text-green-400 font-medium mb-1">Strengths:</h5>
                <ul className="list-disc list-inside text-gray-300 text-sm">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {feedback.improvements.length > 0 && (
              <div>
                <h5 className="text-yellow-400 font-medium mb-1">Areas for Improvement:</h5>
                <ul className="list-disc list-inside text-gray-300 text-sm">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black p-6">
        <div className="flex items-center justify-center space-x-8">
          <button
            onClick={handleToggleMute}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isMuted 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isMuted ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <MicrophoneIcon className="h-8 w-8" />
            )}
          </button>

          <button
            onClick={handleToggleVideo}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isVideoOff 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isVideoOff ? (
              <VideoCameraSlashIcon className="h-8 w-8" />
            ) : (
              <VideoCameraIcon className="h-8 w-8" />
            )}
          </button>

          <button
            onClick={handleEndInterview}
            className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
          >
            <PhoneXMarkIcon className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* Side Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed left-0 top-0 h-full w-80 bg-gray-900 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Interview Menu</h2>
              <button
                onClick={() => setShowMenu(false)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="font-medium mb-2">Progress</h3>
                <p className="text-gray-400">Question {currentQuestion} of {totalQuestions}</p>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="font-medium mb-2">Time Remaining</h3>
                <p className="text-gray-400">{formatTime(timeLeft)}</p>
              </div>
              
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`w-full p-4 rounded-lg transition-colors ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIInterview