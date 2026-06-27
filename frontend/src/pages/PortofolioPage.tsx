import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getInitials } from '../../utils/user'

import Sidebar from '../../components/dashboard/Sidebar'
import MobileSidebar from '../../components/dashboard/MobileSidebar'
import TopBar from '../../components/dashboard/TopBar'
import { navItems as dashboardNavItems } from '../../components/dashboard/data'

import PortfolioToolbar from '../components/portfolio/PortfolioToolbar'
import PortfolioTable from '../components/portfolio/PortfolioTable'
import PortfolioDetail from '../components/portfolio/PortfolioDetail'
import PortfolioAssets from '../components/portfolio/PortfolioAssets'
import { portfolios } from '../components/portfolio/data'
import { riskColor, Portfolio as PortfolioType } from '../components/portfolio/types'

function PortfolioPage() {
  const [activeNav, setActiveNav] = useState('Portfolio')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All')
  const [selectedId, setSelectedId] = useState<string>(portfolios[0].id)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const displayName = user?.name ?? 'Andika Pratama'
  const initials = user?.name ? getInitials(user.name) : 'AP'
  const membership = 'Premium Member'

  const filteredPortfolios = portfolios.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = riskFilter === 'All' || p.risk === riskFilter
    return matchesSearch && matchesRisk
  })

  const selectedPortfolio = portfolios.find((p) => p.id === selectedId) ?? filteredPortfolios[0] ?? portfolios[0]

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
          .mm-row { transition: background 0.2s ease, border-color 0.2s ease; }

          @media (prefers-reduced-motion: reduce) {
            .mm-fade-up { animation: none !important; opacity: 1 !important; }
          }
        `}
      </style>

      <div className="min-h-screen w-full bg-[#080C18] mm-font-body flex">
        {/* Mobile Sidebar */}
        <MobileSidebar
          open={mobileSidebarOpen}
          setOpen={setMobileSidebarOpen}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          handleLogout={handleLogout}
          navItems={dashboardNavItems}
        />

        {/* Sidebar */}
        <Sidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          handleLogout={handleLogout}
          navItems={dashboardNavItems}
        />

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <TopBar
            displayName={displayName}
            initials={initials}
            membership={membership}
            hasNotification={false}
            onOpenSidebar={() => setMobileSidebarOpen(true)}
            title="Portfolio"
            subtitle="Manage all of your investment portfolios"
          />

          {/* Content */}
          <main className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 space-y-6">
            <PortfolioToolbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              riskFilter={riskFilter}
              setRiskFilter={setRiskFilter}
            />
            <PortfolioTable
              portfolios={filteredPortfolios}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              riskColor={riskColor}
            />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-5">
              <PortfolioDetail portfolio={selectedPortfolio} riskColor={riskColor} />
              <PortfolioAssets assets={selectedPortfolio.assets} />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default PortfolioPage