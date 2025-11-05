import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import MainSidebar from './MainSidebar'
import ResumeSidebar from './ResumeSidebar'
import Header from './Header'

const Layout = () => {
  const location = useLocation()
  
  // Determine which sidebar to show based on current route
  const getSidebarComponent = () => {
    if (location.pathname.includes('/resume') || 
        location.pathname.includes('/cover-letters') || 
        location.pathname.includes('/analytics') ||
        location.pathname.includes('/ai-assistant')) {
      return <ResumeSidebar />
    }
    
    // For main app routes like interviews, dashboard, practice
    if (location.pathname.includes('/interviews') ||
        location.pathname.includes('/practice') ||
        location.pathname.includes('/notes') ||
        location.pathname.includes('/profile')) {
      return <MainSidebar />
    }
    
    // Default to main sidebar for dashboard and other routes
    return <MainSidebar />
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {getSidebarComponent()}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout