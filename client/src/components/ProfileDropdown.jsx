import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UserCircleIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  BookmarkIcon,
  ChartBarIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline'

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const menuItems = [
    {
      icon: UserCircleIcon,
      label: 'Profile',
      route: '/app/profile',
      description: 'Manage your account'
    },
    {
      icon: DocumentTextIcon,
      label: 'Resume Manager',
      route: '/app/resume-manager',
      description: 'Manage AI resumes'
    },
    {
      icon: PencilSquareIcon,
      label: 'My Notes',
      route: '/app/my-notes',
      description: 'Interview notes'
    },
    {
      icon: ChartBarIcon,
      label: 'Analytics',
      route: '/app/analytics',
      description: 'Performance stats'
    },
    {
      icon: BookmarkIcon,
      label: 'Saved Items',
      route: '/app/saved',
      description: 'Bookmarked content'
    },
    {
      icon: BellIcon,
      label: 'Notifications',
      route: '/app/notifications',
      description: 'Alerts & updates'
    },
    {
      icon: CogIcon,
      label: 'Settings',
      route: '/app/settings',
      description: 'App preferences'
    }
  ]

  const handleItemClick = (route) => {
    navigate(route)
    setIsOpen(false)
  }

  const handleLogout = () => {
    // Handle logout logic here
    localStorage.removeItem('token')
    navigate('/login')
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">D</span>
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white">Demo</p>
          <p className="text-xs text-gray-400">Premium Plan</p>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50">
          {/* User Info Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Demo User</h3>
                <p className="text-sm text-gray-400">demo@example.com</p>
                <span className="inline-block px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-xs text-white rounded-full mt-1">
                  Premium Plan
                </span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={index}
                  onClick={() => handleItemClick(item.route)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-700 transition-colors duration-200"
                >
                  <Icon className="h-5 w-5 text-gray-400" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-700 py-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-700 transition-colors duration-200 text-red-400 hover:text-red-300"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">Sign Out</p>
                <p className="text-xs text-gray-400">Log out of your account</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileDropdown