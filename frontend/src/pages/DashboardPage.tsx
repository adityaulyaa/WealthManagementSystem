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
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');

          .mm-font-display { font-family: 'Fraunces', serif; }
          .mm-font-body { font-family: 'Inter', sans-serif; }

          @keyframes mm-fade-up {
            0% { opacity: 0; transform: translateY(14px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .mm-fade-up { animation: mm-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

          @keyframes mm-draw {
            to { stroke-dashoffset: 0; }
          }
          .mm-draw-path {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: mm-draw 2.2s cubic-bezier(0.65, 0, 0.35, 1) 0.2s forwards;
          }
          .mm-draw-path-2 {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: mm-draw 2.2s cubic-bezier(0.65, 0, 0.35, 1) 0.5s forwards;
          }
          .mm-fill-fade {
            opacity: 0;
            animation: mm-fade-up 1s ease 0.8s forwards;
          }

          .mm-input {
            background: #10172A;
            border: 1px solid #263150;
            transition: border-color 0.25s ease, box-shadow 0.25s ease;
          }
          .mm-input:focus {
            border-color: #C99A4B;
            box-shadow: 0 0 0 3px rgba(201, 154, 75, 0.15);
          }

          .mm-nav-item { transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease; }

          @media (prefers-reduced-motion: reduce) {
            .mm-fade-up, .mm-draw-path, .mm-draw-path-2, .mm-fill-fade {
              animation: none !important;
              opacity: 1 !important;
              stroke-dashoffset: 0 !important;
            }
          }
        `}
      </style>

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
