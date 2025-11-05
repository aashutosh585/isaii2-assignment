import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  HomeIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  BookOpenIcon,
  ChartBarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: HomeIcon },
    { name: 'Interviews', href: '/app/interviews', icon: BriefcaseIcon },
    { name: 'Mock Tests', href: '/app/practice', icon: AcademicCapIcon },
    { name: 'Resume', href: '/app/resume', icon: DocumentTextIcon },
    { name: 'Curriculum', href: '/app/curriculum', icon: BookOpenIcon },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="flex flex-col w-64 bg-gray-800 border-r border-gray-700">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-white font-bold text-lg">PrepSaaS</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <UserCircleIcon className="w-6 h-6 text-gray-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="mr-3 h-5 w-5 shrink-0" />
              {item.name}
            </NavLink>
          )
        })}
      </nav>

      {/* Settings and Logout */}
      <div className="p-2 border-t border-gray-700">
        <button
          className="group flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-all duration-200"
        >
          <CogIcon className="mr-3 h-5 w-5 shrink-0" />
          Settings
        </button>
        <button
          onClick={logout}
          className="group flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-red-600 hover:text-white transition-all duration-200 mt-1"
        >
          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar