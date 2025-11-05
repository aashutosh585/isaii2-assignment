import React, { createContext, useContext, useReducer, useEffect } from 'react'
import toast from 'react-hot-toast'
import { authAPI } from '../services/api'

const AuthContext = createContext()

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: true,
  isAuthenticated: false
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      }
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Initialize auth state and load user on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        dispatch({ type: 'SET_TOKEN', payload: token })
        try {
          const response = await authAPI.getProfile()
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: response.data.user,
              token: token
            }
          })
        } catch (error) {
          console.error('Load user error:', error)
          dispatch({ type: 'AUTH_ERROR' })
          localStorage.removeItem('token')
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    initializeAuth()
  }, [])

  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        dispatch({ type: 'AUTH_ERROR' })
        return
      }

      const response = await authAPI.getProfile()
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: token
        }
      })
    } catch (error) {
      console.error('Load user error:', error)
      dispatch({ type: 'AUTH_ERROR' })
      localStorage.removeItem('token')
    }
  }

  const login = async (credentials) => {
    try {
      console.log('Logging in user:', credentials.email)
      const response = await authAPI.login(credentials)
      const { user, token } = response.data

      localStorage.setItem('token', token)

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      })

      toast.success(`Welcome back, ${user.name}!`)
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  const register = async (userData) => {
    try {
      console.log('Registering user:', userData)
      const response = await authAPI.register(userData)
      const { user, token } = response.data

      localStorage.setItem('token', token)

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      })

      toast.success(`Welcome to PrepSaaS, ${user.name}!`)
      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
    toast.success('Logged out successfully')
  }

  const value = {
    ...state,
    login,
    register,
    logout,
    loadUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}