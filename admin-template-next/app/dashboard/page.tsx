import StatCard from '@/components/ui/StatCard'
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Eye,
  Package,
} from 'lucide-react'

const stats = [
  {
    title: '총 사용자',
    value: '24,521',
    trend: 12.5,
    trendLabel: '지난달 대비',
    icon: Users,
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    title: '총 주문',
    value: '8,942',
    trend: 8.2,
    trendLabel: '지난달 대비',
    icon: ShoppingCart,
    iconColor: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    title: '총 매출',
    value: '₩48,295,000',
    trend: -3.1,
    trendLabel: '지난달 대비',
    icon: DollarSign,
    iconColor: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    title: '방문자 수',
    value: '142,853',
    trend: 0,
    trendLabel: '지난달 대비',
    icon: Eye,
    iconColor: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
  },
  {
    title: '전환율',
    value: '3.24%',
    trend: 1.8,
    trendLabel: '지난달 대비',
    icon: TrendingUp,
    iconColor: 'text-pink-600 dark:text-pink-400',
    iconBg: 'bg-pink-100 dark:bg-pink-900/30',
  },
  {
    title: '총 상품',
    value: '1,284',
    trend: 5.7,
    trendLabel: '지난달 대비',
    icon: Package,
    iconColor: 'text-teal-600 dark:text-teal-400',
    iconBg: 'bg-teal-100 dark:bg-teal-900/30',
  },
]

const recentOrders = [
  {
    id: '#ORD-001',
    customer: '김민준',
    email: 'minjun@example.com',
    amount: '₩125,000',
    status: '완료',
    date: '2024-01-15',
  },
  {
    id: '#ORD-002',
    customer: '이서연',
    email: 'seoyeon@example.com',
    amount: '₩89,500',
    status: '처리중',
    date: '2024-01-15',
  },
  {
    id: '#ORD-003',
    customer: '박지호',
    email: 'jiho@example.com',
    amount: '₩234,000',
    status: '배송중',
    date: '2024-01-14',
  },
  {
    id: '#ORD-004',
    customer: '최수아',
    email: 'sua@example.com',
    amount: '₩56,000',
    status: '취소',
    date: '2024-01-14',
  },
  {
    id: '#ORD-005',
    customer: '정도윤',
    email: 'doyun@example.com',
    amount: '₩178,500',
    status: '완료',
    date: '2024-01-13',
  },
]

const statusBadge: Record<string, string> = {
  완료: 'badge badge-green',
  처리중: 'badge badge-blue',
  배송중: 'badge badge-yellow',
  취소: 'badge badge-red',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">대시보드</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          전체 현황을 한눈에 확인하세요.
        </p>
      </div>

      {/* Stat cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">최근 주문</h2>
          <button className="btn-primary text-xs px-3 py-1.5">전체 보기</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="table-header">주문 번호</th>
                <th className="table-header">고객</th>
                <th className="table-header hidden sm:table-cell">이메일</th>
                <th className="table-header">금액</th>
                <th className="table-header">상태</th>
                <th className="table-header hidden md:table-cell">날짜</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <td className="table-cell font-medium text-blue-600 dark:text-blue-400">
                    {order.id}
                  </td>
                  <td className="table-cell font-medium">{order.customer}</td>
                  <td className="table-cell hidden sm:table-cell text-gray-500 dark:text-gray-400">
                    {order.email}
                  </td>
                  <td className="table-cell font-medium">{order.amount}</td>
                  <td className="table-cell">
                    <span className={statusBadge[order.status]}>{order.status}</span>
                  </td>
                  <td className="table-cell hidden md:table-cell text-gray-500 dark:text-gray-400">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
