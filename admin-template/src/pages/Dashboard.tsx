import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react'
import StatCard from '../components/ui/StatCard'

const recentOrders = [
  { id: '#3201', customer: '김민준', amount: '₩128,000', status: 'completed', date: '2026-05-12' },
  { id: '#3200', customer: '이서연', amount: '₩54,500', status: 'pending', date: '2026-05-12' },
  { id: '#3199', customer: '박지호', amount: '₩320,000', status: 'completed', date: '2026-05-11' },
  { id: '#3198', customer: '최수아', amount: '₩78,900', status: 'cancelled', date: '2026-05-11' },
  { id: '#3197', customer: '정다은', amount: '₩215,000', status: 'pending', date: '2026-05-10' },
]

const statusBadge: Record<string, string> = {
  completed: 'badge badge-green',
  pending: 'badge badge-yellow',
  cancelled: 'badge badge-red',
}
const statusLabel: Record<string, string> = {
  completed: '완료',
  pending: '대기',
  cancelled: '취소',
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">대시보드</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">오늘의 현황을 확인하세요</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="전체 사용자" value="24,512" change={12.5} icon={Users} color="blue" />
        <StatCard title="월간 매출" value="₩48.2M" change={8.1} icon={DollarSign} color="green" />
        <StatCard title="신규 주문" value="1,284" change={-3.2} icon={ShoppingBag} color="purple" />
        <StatCard title="전환율" value="3.6%" change={0.8} icon={TrendingUp} color="orange" />
      </div>

      {/* Recent Orders */}
      <div className="card">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">최근 주문</h2>
          <button className="btn-secondary text-xs py-1.5">전체 보기</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="px-5 py-3">주문번호</th>
                <th className="px-5 py-3">고객</th>
                <th className="px-5 py-3">금액</th>
                <th className="px-5 py-3">상태</th>
                <th className="px-5 py-3">날짜</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">{order.id}</td>
                  <td className="px-5 py-3 text-sm text-gray-900 dark:text-gray-100">{order.customer}</td>
                  <td className="px-5 py-3 text-sm text-gray-900 dark:text-gray-100">{order.amount}</td>
                  <td className="px-5 py-3">
                    <span className={statusBadge[order.status]}>{statusLabel[order.status]}</span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
