import { clsx } from 'clsx'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  trend?: number
  trendLabel?: string
  icon?: React.ComponentType<{ className?: string }>
  iconColor?: string
  iconBg?: string
}

export default function StatCard({
  title,
  value,
  trend,
  trendLabel,
  icon: Icon,
  iconColor = 'text-blue-600 dark:text-blue-400',
  iconBg = 'bg-blue-100 dark:bg-blue-900/30',
}: StatCardProps) {
  const isPositive = trend !== undefined && trend > 0
  const isNegative = trend !== undefined && trend < 0
  const isNeutral = trend === 0

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {trend !== undefined && (
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={clsx(
                  'flex items-center gap-0.5 text-xs font-medium',
                  isPositive && 'text-green-600 dark:text-green-400',
                  isNegative && 'text-red-600 dark:text-red-400',
                  isNeutral && 'text-gray-500 dark:text-gray-400'
                )}
              >
                {isPositive && <TrendingUp className="w-3.5 h-3.5" />}
                {isNegative && <TrendingDown className="w-3.5 h-3.5" />}
                {isNeutral && <Minus className="w-3.5 h-3.5" />}
                {isPositive && '+'}
                {trend}%
              </span>
              {trendLabel && (
                <span className="text-xs text-gray-400">{trendLabel}</span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
            <Icon className={clsx('w-6 h-6', iconColor)} />
          </div>
        )}
      </div>
    </div>
  )
}
