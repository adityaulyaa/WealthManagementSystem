import type { RiskLevel } from '../../types/portfolio/RiskLevel'

export interface Asset {
  name: string
  type: string
  percent: number
}

export interface Portfolio {
  id: string
  name: string
  type: string
  risk: RiskLevel
  created: string
  updated: string
  assets: Asset[]
}
