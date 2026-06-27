import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import MobileSidebar from '../components/dashboard/MobileSidebar'
import PortfolioChart from '../components/dashboard/PortfolioChart'
import QuickActions from '../components/dashboard/QuickActions'
import RecentActivity from '../components/dashboard/RecentActivity'
import Sidebar from '../components/dashboard/Sidebar'
import SummaryCards from '../components/dashboard/SummaryCards'
import TopBar from '../components/dashboard/TopBar'

import {
  navItems,
  summaryCards,
  activities,
  quickActions,
} from '../components/dashboard/data'

import { getInitials } from '../utils/user'

function DashboardPage() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = (): void => {
    logout()
    navigate('/login')
  }

  const displayName = user?.name ?? 'Andika Pratama'
  const initials = user?.name ? getInitials(user.name) : 'AP'
  const membership = 'Premium Member'
  const hasNotification = true

  return (
    <>
      <div className="min-h-screen w-full bg-[#080C18] mm-font-body flex">
        {/* Watermark - Top Right */}
        <div className="fixed top-6 right-6 z-50 pointer-events-none select-none">
          <span className="text-[#D9B36C]/15 text-xs md:text-sm font-medium mm-font-body">
            #AdityaUlyaAnITGuy
          </span>
        </div>

        <MobileSidebar
          open={mobileSidebarOpen}
          setOpen={setMobileSidebarOpen}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          handleLogout={handleLogout}
          navItems={navItems}
        />

        <Sidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          handleLogout={handleLogout}
          navItems={navItems}
        />

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar
            displayName={displayName}
            initials={initials}
            membership={membership}
            hasNotification={hasNotification}
            onOpenSidebar={() => setMobileSidebarOpen(true)}
            title={undefined}
          />

          {/* Content */}
          <main className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 space-y-7">
            <SummaryCards summaryCards={summaryCards} />
            <QuickActions quickActions={quickActions} />

            {/* Chart + Recent activity */}
            <section className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5">
              <PortfolioChart />
              <RecentActivity activities={activities} />
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
