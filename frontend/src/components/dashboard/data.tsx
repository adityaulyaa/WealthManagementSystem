import type {
  NavItem,
  SummaryCard,
  Activity,
  QuickAction,
} from './types'

export const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5" />
    ),
  },
  {
    name: 'Portfolio',
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      </>
    ),
  },
  {
    name: 'Financial Goals',
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    name: 'Risk Profile',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    ),
  },
]

export const summaryCards: SummaryCard[] = [
  { label: 'Total Balance', value: 'Rp 482.350.000', trend: '+4.8%', positive: true },
  { label: 'Total Growth', value: 'Rp 36.120.500', trend: '+2.1%', positive: true },
  { label: 'Active Goals', value: '5 Goals', trend: '2 on track', positive: true },
  { label: 'Risk Score', value: 'Moderate', trend: '-0.3 pts', positive: false },
]

export const activities: Activity[] = [
  { title: 'Investasi Reksa Dana Pasar Uang', amount: '+ Rp 5.000.000', time: '2 jam lalu', positive: true },
  { title: 'Penarikan Dana Darurat', amount: '- Rp 1.200.000', time: 'Kemarin', positive: false },
  { title: 'Dividen Saham BBCA', amount: '+ Rp 850.000', time: '2 hari lalu', positive: true },
  { title: 'Top Up Goal: Dana Pendidikan', amount: '+ Rp 2.500.000', time: '3 hari lalu', positive: true },
  { title: 'Biaya Administrasi Bulanan', amount: '- Rp 25.000', time: '5 hari lalu', positive: false },
]

export const quickActions: QuickAction[] = [
  {
    title: 'New Investment',
    description: 'Create a new investment portfolio',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V9M10 19V5M16 19v-7M22 19H2" />,
  },
  {
    title: 'Add Goal',
    description: 'Create a new financial goal',
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M8 12h8" />
      </>
    ),
  },
  {
    title: 'Update Risk Profile',
    description: 'Review your investment profile',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />,
  },
]
