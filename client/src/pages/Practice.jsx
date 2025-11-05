import { Link } from 'react-router-dom'
import {
  AcademicCapIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const Practice = () => {
  const challenges = [
    {
      id: 'aptitude',
      title: 'Aptitude Round',
      description: 'Test your logical reasoning and quantitative skills',
      topics: ['Logical Reasoning', 'Verbal Ability'],
      icon: AcademicCapIcon,
      color: 'blue',
      difficulties: [
        { level: 'Easy', questions: 20, time: '30 min' },
        { level: 'Medium', questions: 25, time: '35 min' },
        { level: 'Hard', questions: 30, time: '45 min' }
      ]
    },
    {
      id: 'coding',
      title: 'Coding Round',
      description: 'Solve programming challenges and algorithms',
      topics: ['System Design', 'Algorithms'],
      icon: CodeBracketIcon,
      color: 'purple',
      difficulties: [
        { level: 'Easy', questions: 3, time: '60 min' },
        { level: 'Medium', questions: 4, time: '90 min' },
        { level: 'Hard', questions: 5, time: '120 min' }
      ]
    },
    {
      id: 'hr',
      title: 'HR & Behavioral',
      description: 'Practice behavioral and situational questions',
      topics: ['Behavioral Judgement', 'Resume-Based'],
      icon: ChatBubbleLeftRightIcon,
      color: 'green',
      difficulties: [
        { level: 'Easy', questions: 15, time: '25 min' },
        { level: 'Medium', questions: 20, time: '35 min' },
        { level: 'Hard', questions: 25, time: '45 min' }
      ]
    }
  ]

  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/20',
          text: 'text-blue-400',
          button: 'bg-blue-500 hover:bg-blue-600',
          gradient: 'from-blue-500 to-blue-600'
        }
      case 'purple':
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20',
          text: 'text-purple-400',
          button: 'bg-purple-500 hover:bg-purple-600',
          gradient: 'from-purple-500 to-purple-600'
        }
      case 'green':
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/20',
          text: 'text-green-400',
          button: 'bg-green-500 hover:bg-green-600',
          gradient: 'from-green-500 to-green-600'
        }
      default:
        return {
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/20',
          text: 'text-gray-400',
          button: 'bg-gray-500 hover:bg-gray-600',
          gradient: 'from-gray-500 to-gray-600'
        }
    }
  }

  const getDifficultyColor = (level) => {
    switch (level) {
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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Choose Your Challenge</h1>
        <p className="text-xl text-gray-400">Select a round to start your practice session.</p>
      </div>

      {/* Challenge Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {challenges.map((challenge) => {
          const colors = getColorClasses(challenge.color)
          const Icon = challenge.icon

          return (
            <div
              key={challenge.id}
              className="card hover:bg-gray-700/30 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-8 w-8 ${colors.text}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{challenge.description}</p>
                
                {/* Topics */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {challenge.topics.map((topic, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Difficulty Levels */}
              <div className="space-y-3 mb-6">
                {challenge.difficulties.map((difficulty) => (
                  <div
                    key={difficulty.level}
                    className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                  >
                    <div>
                      <span className={`font-medium ${getDifficultyColor(difficulty.level)}`}>
                        {difficulty.level}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <ChartBarIcon className="h-4 w-4" />
                        <span>{difficulty.questions} Questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{difficulty.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to={`/app/test/${challenge.id}/medium`}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center space-x-2 bg-linear-to-r ${colors.gradient} hover:shadow-lg`}
                >
                  <span>Start Practice</span>
                </Link>
                <button className="w-full py-3 px-4 rounded-lg font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 transition-all duration-200">
                  Custom Setup
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Performance */}
      <div className="card">
        <h2 className="text-xl font-bold text-white mb-4">Recent Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">89%</div>
            <div className="text-sm text-gray-400">Aptitude Round</div>
            <div className="text-xs text-gray-500 mt-1">Last attempt</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">76%</div>
            <div className="text-sm text-gray-400">Coding Round</div>
            <div className="text-xs text-gray-500 mt-1">2 days ago</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">92%</div>
            <div className="text-sm text-gray-400">HR & Behavioral</div>
            <div className="text-xs text-gray-500 mt-1">3 days ago</div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="card">
        <h2 className="text-xl font-bold text-white mb-4">Practice Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 shrink-0"></div>
            <div>
              <h3 className="font-medium text-white">Time Management</h3>
              <p className="text-sm text-gray-400">Practice with time limits to improve your speed and accuracy.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 shrink-0"></div>
            <div>
              <h3 className="font-medium text-white">Regular Practice</h3>
              <p className="text-sm text-gray-400">Consistent daily practice leads to better performance.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 shrink-0"></div>
            <div>
              <h3 className="font-medium text-white">Review Mistakes</h3>
              <p className="text-sm text-gray-400">Always review your incorrect answers to learn from them.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
            <div>
              <h3 className="font-medium text-white">Progressive Difficulty</h3>
              <p className="text-sm text-gray-400">Start with easy questions and gradually increase difficulty.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Practice