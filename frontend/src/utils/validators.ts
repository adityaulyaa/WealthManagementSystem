export function validateRequired(value: string, fieldName: string): void {
  const trimmed = value.trim()
  if (!trimmed) {
    throw new Error(`${fieldName} is required.`)
  }
}

export function validatePortfolioForm(data: {
  portfolioName: string
  portfolioType: string
  riskLevel: string
}): void {
  validateRequired(data.portfolioName, 'Portfolio name')
  validateRequired(data.portfolioType, 'Portfolio type')
  validateRequired(data.riskLevel, 'Risk level')
}