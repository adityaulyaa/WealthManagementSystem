import { useState, useEffect } from 'react'
import type { CreateFinancialGoalRequest } from '../../../types/financialGoal/CreateFinancialGoalRequest'
import type { FinancialGoalResponse, GoalCategory } from '../../../types/financialGoal/FinancialGoalResponse'

interface GoalFormModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: CreateFinancialGoalRequest) => Promise<void>
  editGoal?: FinancialGoalResponse | null
  loading?: boolean
}

interface FormState {
  goalName: string
  targetAmount: string
  targetDate: string
  category: string
  currentSavings: string
  monthlyContribution: string
}

interface FormErrors {
  goalName?: string
  targetAmount?: string
  targetDate?: string
  category?: string
  currentSavings?: string
  monthlyContribution?: string
}

const initialFormState: FormState = {
  goalName: '',
  targetAmount: '',
  targetDate: '',
  category: '',
  currentSavings: '0',
  monthlyContribution: '0',
}

const categoryOptions: { value: string; label: string }[] = [
  { value: 'RETIREMENT', label: 'Retirement' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'PROPERTY', label: 'Property' },
  { value: 'EMERGENCY', label: 'Emergency Fund' },
  { value: 'OTHER', label: 'Other' },
]

function GoalFormModal({ open, onClose, onSubmit, editGoal, loading }: GoalFormModalProps) {
  const [form, setForm] = useState<FormState>(initialFormState)
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    if (editGoal) {
      setForm({
        goalName: editGoal.goalName,
        targetAmount: editGoal.targetAmount.toString(),
        targetDate: editGoal.targetDate,
        category: editGoal.category,
        currentSavings: editGoal.currentSavings.toString(),
        monthlyContribution: editGoal.monthlyContribution.toString(),
      })
    } else {
      setForm(initialFormState)
    }
    setErrors({})
  }, [editGoal, open])

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!form.goalName.trim()) {
      newErrors.goalName = 'Goal name is required'
    }

    const targetAmt = parseFloat(form.targetAmount)
    if (!form.targetAmount || isNaN(targetAmt) || targetAmt <= 0) {
      newErrors.targetAmount = 'Target amount must be a positive number'
    }

    if (!form.targetDate) {
      newErrors.targetDate = 'Target date is required'
    }

    if (!form.category) {
      newErrors.category = 'Category is required'
    }

    const savings = parseFloat(form.currentSavings)
    if (form.currentSavings && (!isNaN(savings) && savings < 0)) {
      newErrors.currentSavings = 'Current savings cannot be negative'
    }

    const monthly = parseFloat(form.monthlyContribution)
    if (form.monthlyContribution && (!isNaN(monthly) && monthly < 0)) {
      newErrors.monthlyContribution = 'Monthly contribution cannot be negative'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    const data: CreateFinancialGoalRequest = {
      goalName: form.goalName.trim(),
      targetAmount: parseFloat(form.targetAmount),
      targetDate: form.targetDate,
      category: form.category as GoalCategory,
      currentSavings: parseFloat(form.currentSavings || '0'),
      monthlyContribution: parseFloat(form.monthlyContribution || '0'),
      userId: 0,
    }

    await onSubmit(data)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-[#0F1420] border border-[#1F2433] rounded-lg w-full max-w-lg mx-4 p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white">
            {editGoal ? 'Edit Goal' : 'New Goal'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          {/* Goal Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Goal Name</label>
            <input
              type="text"
              value={form.goalName}
              onChange={e => handleChange('goalName', e.target.value)}
              className="w-full bg-[#1A1F2E] border border-[#2A2F3E] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D9B36C]"
              placeholder="e.g. Buy a House"
            />
            {errors.goalName && <p className="text-red-400 text-xs mt-1">{errors.goalName}</p>}
          </div>

          {/* Target Amount */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Target Amount (Rp)</label>
            <input
              type="number"
              value={form.targetAmount}
              onChange={e => handleChange('targetAmount', e.target.value)}
              className="w-full bg-[#1A1F2E] border border-[#2A2F3E] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D9B36C]"
              placeholder="500000000"
            />
            {errors.targetAmount && <p className="text-red-400 text-xs mt-1">{errors.targetAmount}</p>}
          </div>

          {/* Target Date */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Target Date</label>
            <input
              type="date"
              value={form.targetDate}
              onChange={e => handleChange('targetDate', e.target.value)}
              className="w-full bg-[#1A1F2E] border border-[#2A2F3E] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D9B36C]"
            />
            {errors.targetDate && <p className="text-red-400 text-xs mt-1">{errors.targetDate}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Category</label>
            <select
              value={form.category}
              onChange={e => handleChange('category', e.target.value)}
              className="w-full bg-[#1A1F2E] border border-[#2A2F3E] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D9B36C]"
            >
              <option value="">Select category</option>
              {categoryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Current Savings */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Current Savings (Rp)</label>
            <input
              type="number"
              value={form.currentSavings}
              onChange={e => handleChange('currentSavings', e.target.value)}
              className="w-full bg-[#1A1F2E] border border-[#2A2F3E] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D9B36C]"
              placeholder="0"
            />
            {errors.currentSavings && <p className="text-red-400 text-xs mt-1">{errors.currentSavings}</p>}
          </div>

          {/* Monthly Contribution */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Monthly Contribution (Rp)</label>
            <input
              type="number"
              value={form.monthlyContribution}
              onChange={e => handleChange('monthlyContribution', e.target.value)}
              className="w-full bg-[#1A1F2E] border border-[#2A2F3E] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#D9B36C]"
              placeholder="0"
            />
            {errors.monthlyContribution && <p className="text-red-400 text-xs mt-1">{errors.monthlyContribution}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-300 bg-[#1A1F2E] border border-[#2A2F3E] rounded hover:bg-[#2A2F3E]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm text-black bg-[#D9B36C] rounded hover:bg-[#C9A35C] disabled:opacity-50"
          >
            {loading ? 'Saving...' : editGoal ? 'Update Goal' : 'Create Goal'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GoalFormModal
