import { Search, Plus, MoreHorizontal } from 'lucide-react'

const users = [
  { id: 1, name: '김민준', email: 'minjun@example.com', role: '관리자', status: 'active', joined: '2026-01-15' },
  { id: 2, name: '이서연', email: 'seoyeon@example.com', role: '편집자', status: 'active', joined: '2026-02-08' },
  { id: 3, name: '박지호', email: 'jiho@example.com', role: '사용자', status: 'inactive', joined: '2026-03-22' },
  { id: 4, name: '최수아', email: 'sua@example.com', role: '사용자', status: 'active', joined: '2026-04-01' },
  { id: 5, name: '정다은', email: 'daeun@example.com', role: '편집자', status: 'active', joined: '2026-04-17' },
]

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">사용자 관리</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">전체 {users.length}명</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" />
          사용자 추가
        </button>
      </div>

      <div className="card">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="사용자 검색..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg
                bg-gray-100 dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                placeholder-gray-400
                border border-transparent
                focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800/50">
                <th className="px-5 py-3">사용자</th>
                <th className="px-5 py-3">역할</th>
                <th className="px-5 py-3">상태</th>
                <th className="px-5 py-3">가입일</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-300">{user.role}</td>
                  <td className="px-5 py-3">
                    <span className={user.status === 'active' ? 'badge badge-green' : 'badge badge-red'}>
                      {user.status === 'active' ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">{user.joined}</td>
                  <td className="px-5 py-3">
                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
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
