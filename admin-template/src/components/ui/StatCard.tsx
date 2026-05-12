import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  title: string
  value: string
  change: number
  icon: LucideIcon
  color: 'blue' | 'green' | 'purple' | 'orange'
}

const colorMap = {
  blue:   'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  green:  'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
}

export default function StatCard({ title, value, change, icon: Icon, color }: Props) {
  const positive = change >= 0
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
        <div className={clsx('p-2.5 rounded-lg', colorMap[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className={clsx('mt-3 flex items-center gap-1 text-sm', positive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400')}>
        {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span>{Math.abs(change)}% 지난달 대비</span>
      </div>
    </div>
  )
}
