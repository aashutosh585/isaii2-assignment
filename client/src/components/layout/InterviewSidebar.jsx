import { NavLink, useLocation, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  Squares2X2Icon,
  BriefcaseIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  UserCircleIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

const InterviewSidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const { interviewId } = useParams()

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: Squares2X2Icon },
    { name: 'Interviews', href: '/app/interviews', icon: BriefcaseIcon },
    { name: 'Practice', href: '/app/practice', icon: CodeBracketIcon },
    { name: 'My Notes', href: '/app/notes', icon: DocumentTextIcon },
    { name: 'Profile', href: '/app/profile', icon: UserCircleIcon },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-700 min-h-screen">
      {/* User Profile */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Alex Johnson"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = ''
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <UserCircleIcon className="w-6 h-6 text-gray-300 hidden" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Alex Johnson</p>
            <p className="text-xs text-gray-400">alex.j@email.com</p>
          </div>
        </div>
      </div>

      {/* Current Interview Info */}
      {interviewId && (
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <div className="text-xs text-gray-400 mb-1">Current Interview</div>
          <div className="text-sm font-medium text-white">Google SDE-1 Interview</div>
          <div className="text-xs text-gray-400 mt-1">Interview on 24 Aug, 2024</div>
          <div className="text-xs text-blue-400 mt-1">Package: $150,000 / year</div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="mr-3 h-5 w-5 shrink-0" />
              {item.name}
            </NavLink>
          )
        })}
      </nav>

      {/* Settings and Logout */}
      <div className="p-3 border-t border-gray-700 space-y-1">
        <button className="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200">
          <CogIcon className="mr-3 h-5 w-5 shrink-0" />
          Settings
        </button>
        
        <button
          onClick={logout}
          className="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200"
        >
          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 shrink-0" />
          Log Out
        </button>
      </div>
    </div>
  )
}

export default InterviewSidebar