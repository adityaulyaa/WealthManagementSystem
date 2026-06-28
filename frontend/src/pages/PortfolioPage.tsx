import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getInitials } from '../utils/user'

import Sidebar from '../components/dashboard/Sidebar'
import MobileSidebar from '../components/dashboard/MobileSidebar'
import TopBar from '../components/dashboard/TopBar'
import { navItems as dashboardNavItems } from '../components/dashboard/data'

import PortfolioToolbar from '../components/portfolio/PortfolioToolbar'
import PortfolioTable from '../components/portfolio/PortfolioTable'
import PortfolioDetail from '../components/portfolio/PortfolioDetail'
import PortfolioAssets from '../components/portfolio/PortfolioAssets'
import PortfolioModal from '../components/portfolio/modal/PortfolioModal'
import type { RiskLevel } from '../types/common'

import { usePortfolio } from '../hooks/usePortfolio'

import LoadingState from '../components/common/LoadingState'
import EmptyState from '../components/common/EmptyState'

function PortfolioPage() {
  const [activeNav, setActiveNav] = useState('Portfolio')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'All'>('All')
  const [modalOpen, setModalOpen] = useState(false)

  const { portfolios, loading, selectedId, setSelectedId } = usePortfolio()

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
    const matchesRisk = riskFilter === 'All' || p.risk.toLowerCase() === riskFilter.toLowerCase()
    return matchesSearch && matchesRisk
  })

  const selectedPortfolio = filteredPortfolios.find((p) => p.id === selectedId) ?? filteredPortfolios[0] ?? null

  const handleNewPortfolio = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <div className="min-h-screen w-full bg-[#080C18] mm-font-body flex">
        <MobileSidebar
          open={mobileSidebarOpen}
          setOpen={setMobileSidebarOpen}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          handleLogout={handleLogout}
          navItems={dashboardNavItems}
        />

        <Sidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          handleLogout={handleLogout}
          navItems={dashboardNavItems}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <TopBar
            displayName={displayName}
            initials={initials}
            membership={membership}
            hasNotification={false}
            onOpenSidebar={() => setMobileSidebarOpen(true)}
            title="Portfolio"
            subtitle="Manage all of your investment portfolios"
          />

          <main className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 space-y-6">
            <PortfolioToolbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              riskFilter={riskFilter}
              setRiskFilter={setRiskFilter}
              onNewPortfolio={handleNewPortfolio}
            />
            {loading ? (
              <LoadingState message="Loading portfolios..." />
            ) : filteredPortfolios.length > 0 ? (
              <>
                <PortfolioTable
                  portfolios={filteredPortfolios}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                />
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-5">
                  <PortfolioDetail portfolio={selectedPortfolio} />
                  <PortfolioAssets assets={selectedPortfolio.assets} />
                </div>
              </>
            ) : (
              <EmptyState title="No portfolios found." description="Create your first portfolio." />
            )}
          </main>
        </div>
      </div>
      <PortfolioModal
        open={modalOpen}
        mode="create"
        onClose={handleCloseModal}
      />
    </>
  )
}

export default PortfolioPage

