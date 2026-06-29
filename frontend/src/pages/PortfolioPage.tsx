import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
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
import ConfirmationModal from '../components/common/ConfirmationModal'
import type { RiskLevel } from '../types/common'
import type { CreatePortfolioRequest } from '../types/portfolio/CreatePortfolioRequest'
import type { UpdatePortfolioRequest } from '../types/portfolio/UpdatePortfolioRequest'

import { validatePortfolioForm } from '../utils/validators'
import { usePortfolio } from '../hooks/usePortfolio'

import LoadingState from '../components/common/LoadingState'
import EmptyState from '../components/common/EmptyState'

function PortfolioPage() {
  const [activeNav, setActiveNav] = useState('Portfolio')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'All'>('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

  // State for PortfolioModal form fields
  const [portfolioName, setPortfolioName] = useState('')
  const [portfolioType, setPortfolioType] = useState('')
  const [riskLevel, setRiskLevel] = useState<RiskLevel | ''>('')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { portfolios, loading, selectedId, setSelectedId, createPortfolio, updatePortfolio, deletePortfolio } = usePortfolio()

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // ── Derived State ──────────────────────────────────────────────
  const displayName = user?.name ?? 'Andika Pratama'
  const initials = user?.name ? getInitials(user.name) : 'AP'
  const membership = 'Premium Member'

  const filteredPortfolios = portfolios.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = riskFilter === 'All' || p.risk === riskFilter
    return matchesSearch && matchesRisk
  })

  const selectedPortfolio = filteredPortfolios.find((p) => p.id === selectedId) ?? filteredPortfolios[0] ?? null

  // ── Helper ──────────────────────────────────────────────────────
  const resetPortfolioForm = () => {
    setPortfolioName('')
    setPortfolioType('')
    setRiskLevel('')
  }

  // ── Modal Handler ───────────────────────────────────────────────
  const handleNewPortfolio = () => {
    resetPortfolioForm()
    setModalMode('create')
    setModalOpen(true)
  }

  const handleEditPortfolio = () => {
    if (!selectedPortfolio) {
      toast.error("Please select a portfolio to edit.")
      return
    }
    setPortfolioName(selectedPortfolio.name)
    setPortfolioType(selectedPortfolio.type)
    setRiskLevel(selectedPortfolio.risk)
    setModalMode('edit')
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    if (isSubmitting) return
    setModalOpen(false)
    resetPortfolioForm()
  }

  const handleCloseDeleteConfirmation = () => {
    if (isSubmitting) return
    setDeleteConfirmationOpen(false)
  }

  // ── CRUD Handler ─────────────────────────────────────────────────
  const handleCreatePortfolio = async () => {
    try {
      validatePortfolioForm({ portfolioName, portfolioType, riskLevel })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Validation failed.')
      return
    }

    if (!user) {
      toast.error("User not authenticated.")
      return
    }

    const createRequest: CreatePortfolioRequest = {
      userId: parseInt(user.id),
      portfolioName,
      portfolioType,
      riskLevel: riskLevel as RiskLevel,
    }

    try {
      setIsSubmitting(true)
      await createPortfolio(createRequest)
      toast.success("Portfolio created successfully.")
      setModalOpen(false)
      resetPortfolioForm()
    } catch (error) {
      console.error("Error creating portfolio:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdatePortfolio = async () => {
    try {
      validatePortfolioForm({ portfolioName, portfolioType, riskLevel })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Validation failed.')
      return
    }

    if (!user) {
      toast.error("User not authenticated.")
      return
    }

    if (!selectedPortfolio) {
      toast.error("No portfolio selected.")
      return
    }

    const updateRequest: UpdatePortfolioRequest = {
      userId: parseInt(user.id),
      portfolioName,
      portfolioType,
      riskLevel: riskLevel as RiskLevel,
    }

    try {
      setIsSubmitting(true)
      await updatePortfolio(parseInt(selectedPortfolio.id), updateRequest)
      toast.success("Portfolio updated successfully.")
      setModalOpen(false)
      resetPortfolioForm()
    } catch (error) {
      console.error("Error updating portfolio:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitPortfolio = async () => {
    if (modalMode === 'create') {
      await handleCreatePortfolio()
    } else {
      await handleUpdatePortfolio()
    }
  }

  const handleDeletePortfolio = () => {
    if (!selectedPortfolio) {
      toast.error("No portfolio selected.")
      return
    }
    setDeleteConfirmationOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedPortfolio) return

    try {
      setIsSubmitting(true)
      await deletePortfolio(parseInt(selectedPortfolio.id), selectedId)
      toast.success("Portfolio deleted successfully.")
      setDeleteConfirmationOpen(false)
    } catch (error) {
      console.error("Error deleting portfolio:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Render ───────────────────────────────────────────────────────
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
                  <PortfolioDetail portfolio={selectedPortfolio} onEditPortfolio={handleEditPortfolio} onDeletePortfolio={handleDeletePortfolio} />
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
        mode={modalMode}
        portfolioName={portfolioName}
        portfolioType={portfolioType}
        riskLevel={riskLevel}
        setPortfolioName={setPortfolioName}
        setPortfolioType={setPortfolioType}
        setRiskLevel={setRiskLevel}
        onClose={handleCloseModal}
        onSubmit={handleSubmitPortfolio}
        isSubmitting={isSubmitting}
      />

      <ConfirmationModal
        open={deleteConfirmationOpen}
        title="Delete Portfolio"
        message="Are you sure you want to delete this portfolio? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="danger"
        isSubmitting={isSubmitting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteConfirmation}
      />
    </>
  )
}

export default PortfolioPage

