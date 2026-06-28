import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getInitials } from '../utils/user'

import Sidebar from '../components/dashboard/Sidebar'
import MobileSidebar from '../components/dashboard/MobileSidebar'
import TopBar from '../components/dashboard/TopBar'
import { navItems as dashboardNavItems } from '../components/dashboard/data'

import { goals } from '../components/financialGoals/data'
import GoalToolbar from '../components/financialGoals/GoalToolbar'
import GoalList from '../components/financialGoals/GoalList'
import GoalDetail from '../components/financialGoals/GoalDetail'

function FinancialGoalsPage() {
  const [activeNav, setActiveNav] = useState('Financial Goals')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(goals[0]?.id ?? null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = (): void => {
    logout()
    navigate('/login')
  }

  const displayName = user?.name ?? 'Andika Pratama'
  const initials = user?.name ? getInitials(user.name) : 'AP'
  const membership = 'Premium Member'

  const filteredGoals = goals.filter((g) => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.category.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const selectedGoal = goals.find((g) => g.id === selectedId) ?? null

  const handleNewGoal = () => {
    // TODO: Implement navigation to New Goal form
    console.log("New Goal button clicked")
  }

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
            title="Financial Goals"
            subtitle="Manage and track your financial goals"
          />

          {/* Content */}
          <main className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 space-y-6">
            <GoalToolbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onNewGoal={handleNewGoal}
            />

            {/* Goal list + detail */}
            <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
              {/* Goal list */}
              <div>
                <GoalList
                  goals={filteredGoals}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              </div>

              {/* Goal detail */}
              <GoalDetail goal={selectedGoal} />
            </section>
          </main>
        </div>
      </div>
    </>
  )
}

export default FinancialGoalsPage