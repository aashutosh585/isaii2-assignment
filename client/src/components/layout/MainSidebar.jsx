import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  Squares2X2Icon,
  BriefcaseIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  UserCircleIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  FolderIcon
} from '@heroicons/react/24/outline'

const MainSidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: Squares2X2Icon },
    { name: 'Interviews', href: '/app/interviews', icon: BriefcaseIcon },
    { name: 'Practice', href: '/app/practice', icon: CodeBracketIcon },
    { name: 'My Notes', href: '/app/my-notes', icon: DocumentTextIcon },
    { name: 'Profile', href: '/app/profile', icon: UserCircleIcon },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="flex flex-col w-56 bg-gray-800 border-r border-gray-700 min-h-screen">
      {/* User Profile */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
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
            <UserCircleIcon className="w-8 h-8 text-gray-300 hidden" />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">Alex Johnson</p>
            <p className="text-sm text-gray-400">alex.j@email.com</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`group flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                active
                  ? 'bg-gray-700 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="mr-4 h-6 w-6 shrink-0" />
              {item.name}
            </NavLink>
          )
        })}
      </nav>

      {/* Settings and Logout */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        <button className="group flex items-center w-full px-4 py-3 text-base font-medium text-gray-300 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-200">
          <CogIcon className="mr-4 h-6 w-6 shrink-0" />
          Settings
        </button>
        <button
          onClick={logout}
          className="group flex items-center w-full px-4 py-3 text-base font-medium text-gray-300 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-200"
        >
          <ArrowRightOnRectangleIcon className="mr-4 h-6 w-6 shrink-0" />
          Log Out
        </button>
      </div>
    </div>
  )
}

export default MainSidebar