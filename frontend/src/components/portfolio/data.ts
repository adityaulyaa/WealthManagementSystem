import type { Portfolio } from './types'

export const portfolios: Portfolio[] = [
  {
    id: 'pf-1',
    name: 'Growth Strategy',
    type: 'Growth',
    risk: 'High',
    created: '20 June 2026',
    updated: '25 June 2026',
    assets: [
      { name: 'BBCA', type: 'Stock', percent: 40 },
      { name: 'TLKM', type: 'Stock', percent: 30 },
      { name: 'Obligasi', type: 'Bond', percent: 20 },
      { name: 'Cash', type: 'Cash', percent: 10 },
    ],
  },
  {
    id: 'pf-2',
    name: 'Retirement Fund',
    type: 'Balanced',
    risk: 'Medium',
    created: '02 March 2026',
    updated: '18 June 2026',
    assets: [
      { name: 'Obligasi Negara', type: 'Bond', percent: 45 },
      { name: 'BBRI', type: 'Stock', percent: 25 },
      { name: 'Reksa Dana Pasar Uang', type: 'Mutual Fund', percent: 20 },
      { name: 'Cash', type: 'Cash', percent: 10 },
    ],
  },
  {
    id: 'pf-3',
    name: 'Emergency Reserve',
    type: 'Conservative',
    risk: 'Low',
    created: '11 January 2026',
    updated: '10 June 2026',
    assets: [
      { name: 'Deposito Berjangka', type: 'Deposit', percent: 60 },
      { name: 'Obligasi Negara', type: 'Bond', percent: 25 },
      { name: 'Cash', type: 'Cash', percent: 15 },
    ],
  },
  {
    id: 'pf-4',
    name: 'Education Fund',
    type: 'Growth',
    risk: 'Medium',
    created: '05 April 2026',
    updated: '22 June 2026',
    assets: [
      { name: 'TLKM', type: 'Stock', percent: 35 },
      { name: 'Reksa Dana Saham', type: 'Mutual Fund', percent: 35 },
      { name: 'Obligasi', type: 'Bond', percent: 20 },
      { name: 'Cash', type: 'Cash', percent: 10 },
    ],
  },
]