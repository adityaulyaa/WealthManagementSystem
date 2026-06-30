import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getInitials } from '../utils/user'

import Sidebar from '../components/dashboard/Sidebar'
import MobileSidebar from '../components/dashboard/MobileSidebar'
import TopBar from '../components/dashboard/TopBar'
import { navItems as dashboardNavItems } from '../components/dashboard/data'

import GoalToolbar from '../components/financialGoals/GoalToolbar'
import GoalList from '../components/financialGoals/GoalList'
import GoalDetail from '../components/financialGoals/GoalDetail'
import LoadingState from '../components/common/LoadingState'
import EmptyState from '../components/common/EmptyState'
import ConfirmationModal from '../components/common/ConfirmationModal'
import GoalFormModal from '../components/financialGoals/modal/GoalFormModal'

import { useFinancialGoals } from '../hooks/useFinancialGoals'
import FinancialGoalService from '../services/financialGoalService'
import type { Goal } from '../components/financialGoals/types'
import type { CreateFinancialGoalRequest } from '../types/financialGoal/CreateFinancialGoalRequest'

function FinancialGoalsPage() {
  const [activeNav, setActiveNav] = useState('Financial Goals')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { goals, loading, selectedId, setSelectedId, refreshGoals } = useFinancialGoals()

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editGoal, setEditGoal] = useState<Goal | null>(null)
  const [deleteGoalId, setDeleteGoalId] = useState<number | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const handleLogout = (): void => {
    logout()
    navigate('/login')
  }

  const filteredGoals = goals.filter((g) =>
    g.goalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreate = async (data: CreateFinancialGoalRequest) => {
    if (user?.id) {
      await FinancialGoalService.createGoal({ ...data, userId: user.id })
      await refreshGoals()
    }
    setCreateModalOpen(false)
  }

  const handleEdit = async (data: CreateFinancialGoalRequest) => {
    if (editGoal && user?.id) {
      await FinancialGoalService.updateGoal(editGoal.id, { ...data, userId: user.id })
      await refreshGoals()
    }
    setEditGoal(null)
  }

  const handleDelete = async () => {
    if (deleteGoalId) {
      await FinancialGoalService.deleteGoal(deleteGoalId)
      await refreshGoals()
    }
    setDeleteGoalId(null)
    setDeleteConfirmOpen(false)
  }

  const selectedGoal = filteredGoals.find(g => g.id === selectedId) ?? filteredGoals[0] ?? null

  return (
    <div className="min-h-screen w-full bg-[#080C18] mm-font-body flex">
      <MobileSidebar open={mobileSidebarOpen} setOpen={setMobileSidebarOpen} activeNav={activeNav} setActiveNav={setActiveNav} handleLogout={handleLogout} navItems={dashboardNavItems} />
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} handleLogout={handleLogout} navItems={dashboardNavItems} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar displayName={user?.name ?? 'Andika Pratama'} initials={user?.name ? getInitials(user.name) : 'AP'} membership="Premium Member" hasNotification={false} onOpenSidebar={() => setMobileSidebarOpen(true)} title="Financial Goals" subtitle="Manage and track your financial goals" />
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 space-y-6">
          <GoalToolbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onNewGoal={() => setCreateModalOpen(true)} />

          {loading ? <LoadingState message="Loading financial goals..." /> : filteredGoals.length > 0 ? (
            <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
              <GoalList goals={filteredGoals} selectedId={selectedGoal?.id ?? null} onSelect={setSelectedId} />
              <GoalDetail goal={selectedGoal} onEdit={(g) => setEditGoal(g)} onDelete={(id) => { setDeleteGoalId(id); setDeleteConfirmOpen(true) }} />
            </section>
          ) : <EmptyState title="No goals found." description="Create your first goal." />}

          <GoalFormModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} onSubmit={handleCreate} />
          {editGoal && <GoalFormModal open={!!editGoal} onClose={() => setEditGoal(null)} onSubmit={handleEdit} editGoal={editGoal} />}
          <ConfirmationModal open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} onConfirm={handleDelete} title="Delete Goal" message="Are you sure you want to delete this goal?" />
        </main>
      </div>
    </div>
  )
}

export default FinancialGoalsPage
