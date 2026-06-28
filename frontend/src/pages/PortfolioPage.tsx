import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getInitials } from '../utils/user'
import { toast } from 'react-toastify'

import Sidebar from '../components/dashboard/Sidebar'
import MobileSidebar from '../components/dashboard/MobileSidebar'
import TopBar from '../components/dashboard/TopBar'
import { navItems as dashboardNavItems } from '../components/dashboard/data'

import PortfolioToolbar from '../components/portfolio/PortfolioToolbar'
import PortfolioTable from '../components/portfolio/PortfolioTable'
import PortfolioDetail from '../components/portfolio/PortfolioDetail'
import PortfolioAssets from '../components/portfolio/PortfolioAssets'
import { portfolios as dummyPortfolios } from '../components/portfolio/data'
import type { Portfolio } from '../components/portfolio/types'
import type { RiskLevel } from '../types/common'

import PortfolioService from '../services/portfolioService'
import { mapPortfolioResponseToPortfolio } from '../utils/mappers'

function PortfolioPage() {
  const [activeNav, setActiveNav] = useState('Portfolio')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'All'>('All')
  
  const [portfolios, setPortfolios] = useState<Portfolio[]>(dummyPortfolios) // Initialize with dummy data
  const [selectedId, setSelectedId] = useState<string>(portfolios[0]?.id ?? '') // Handle potential empty array
  const [loading, setLoading] = useState(true)

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const displayName = user?.name ?? 'Andika Pratama'
  const initials = user?.name ? getInitials(user.name) : 'AP'
  const membership = 'Premium Member'

  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoading(true)
      try {
        const response = await PortfolioService.getAllPortfolios()
        const mappedPortfolios = response.map(mapPortfolioResponseToPortfolio)
        setPortfolios(mappedPortfolios)
        if (mappedPortfolios.length > 0) {
          setSelectedId(mappedPortfolios[0].id)
        } else {
          setSelectedId('') // Clear selection if no portfolios
        }
      } catch (err) {
        console.error("Failed to fetch portfolios:", err)
        toast.error("Failed to load portfolios. Displaying dummy data.")
        // Fallback to dummy data if API fails and we have no data
        setPortfolios(dummyPortfolios) 
        if (dummyPortfolios.length > 0) {
          setSelectedId(dummyPortfolios[0].id)
        } else {
          setSelectedId('')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, []) // Empty dependency array means this runs once on mount

  const filteredPortfolios = portfolios.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = riskFilter === 'All' || p.risk.toLowerCase() === riskFilter.toLowerCase() // Ensure case-insensitive match
    return matchesSearch && matchesRisk
  })

  // Ensure selectedId is always valid for filtered portfolios, or default to first or empty
  const selectedPortfolio = filteredPortfolios.find((p) => p.id === selectedId) ?? filteredPortfolios[0] ?? null

  return (
    <>
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
            {loading ? (
              <div className="flex items-center justify-center h-48 text-white">Loading portfolios...</div>
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
              <div className="mm-fade-up bg-[#0C1224] border border-[#1C2540] rounded-2xl flex flex-col items-center justify-center text-center py-16 px-6">
                <div className="w-12 h-12 rounded-xl bg-[#10172A] border border-[#263150] flex items-center justify-center mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#56628A" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
                  </svg>
                </div>
                <p className="text-[14px] text-white font-medium mb-1">No portfolios found.</p>
                <p className="text-[13px] text-[#7E8AA8]">Create your first portfolio.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}

export default PortfolioPage