import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  Squares2X2Icon,
  DocumentTextIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  ChartBarIcon,
  SparklesIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  PencilSquareIcon,
  FolderIcon
} from '@heroicons/react/24/outline'

const ResumeSidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: Squares2X2Icon },
    { name: 'Resumes', href: '/app/resume', icon: DocumentTextIcon },
    { name: 'Resume Manager', href: '/app/resume-manager', icon: FolderIcon, active: true },
    { name: 'Resume Editor', href: '/app/resume-editor', icon: PencilSquareIcon },
    { name: 'Cover Letters', href: '/app/cover-letters', icon: EnvelopeIcon },
    { name: 'Analytics', href: '/app/analytics', icon: ChartBarIcon },
    { name: 'AI Assistant', href: '/app/ai-assistant', icon: SparklesIcon },
  ]

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path)

  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-700 min-h-screen">
      {/* User Profile */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="John Doe"
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
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-gray-400">john.doe@email.com</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href) || (item.name === 'Resumes' && location.pathname.includes('/resume'))
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

      {/* Bottom Section */}
      <div className="p-3 border-t border-gray-700 space-y-1">
        <button className="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200">
          <CogIcon className="mr-3 h-5 w-5 shrink-0" />
          Settings
        </button>
        
        <button className="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200">
          <QuestionMarkCircleIcon className="mr-3 h-5 w-5 shrink-0" />
          Help
        </button>

        <button
          onClick={logout}
          className="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200"
        >
          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 shrink-0" />
          Log Out
        </button>
      </div>

      {/* Premium Badge */}
      <div className="p-3">
        <div className="bg-blue-600 rounded-lg p-3 text-center">
          <p className="text-white text-sm font-medium">Premium Plan</p>
          <button className="w-full mt-2 bg-white text-blue-600 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-100 transition-colors">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumeSidebar