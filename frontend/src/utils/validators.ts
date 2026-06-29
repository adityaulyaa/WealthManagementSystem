export function validateRequired(value: string, fieldName: string): void {
  const trimmed = value.trim()
  if (!trimmed) {
    throw new Error(`${fieldName} is required.`)
  }
}

function validateStringLength(value: string, fieldName: string, min: number, max: number): void {
  const length = value.trim().length
  if (length < min) {
    throw new Error(`${fieldName} must be at least ${min} characters.`)
  }
  if (length > max) {
    throw new Error(`${fieldName} must be at most ${max} characters.`)
  }
}

function validateRiskLevel(value: string): void {
  const allowed = ['LOW', 'MEDIUM', 'HIGH']
  if (!allowed.includes(value)) {
    throw new Error(`Risk level must be one of ${allowed.join(', ')}`)
  }
}

export function validatePortfolioForm(data: {
  portfolioName: string
  portfolioType: string
  riskLevel: string
}): void {
  validateRequired(data.portfolioName, 'Portfolio name')
  validateStringLength(data.portfolioName, 'Portfolio name', 3, 50)
  validateRequired(data.portfolioType, 'Portfolio type')
  validateRequired(data.riskLevel, 'Risk level')
  validateRiskLevel(data.riskLevel)
}