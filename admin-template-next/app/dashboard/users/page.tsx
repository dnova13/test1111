import { Search, UserPlus, Filter } from 'lucide-react'

const users = [
  {
    id: 1,
    name: '김민준',
    email: 'minjun@example.com',
    role: '관리자',
    status: '활성',
    joined: '2023-05-12',
    avatar: 'KM',
  },
  {
    id: 2,
    name: '이서연',
    email: 'seoyeon@example.com',
    role: '편집자',
    status: '활성',
    joined: '2023-07-20',
    avatar: 'LS',
  },
  {
    id: 3,
    name: '박지호',
    email: 'jiho@example.com',
    role: '뷰어',
    status: '비활성',
    joined: '2023-09-01',
    avatar: 'PJ',
  },
  {
    id: 4,
    name: '최수아',
    email: 'sua@example.com',
    role: '편집자',
    status: '활성',
    joined: '2023-10-15',
    avatar: 'CS',
  },
  {
    id: 5,
    name: '정도윤',
    email: 'doyun@example.com',
    role: '뷰어',
    status: '정지',
    joined: '2024-01-03',
    avatar: 'JD',
  },
  {
    id: 6,
    name: '한예린',
    email: 'yerin@example.com',
    role: '관리자',
    status: '활성',
    joined: '2024-01-10',
    avatar: 'HY',
  },
]

const statusBadge: Record<string, string> = {
  활성: 'badge badge-green',
  비활성: 'badge badge-gray',
  정지: 'badge badge-red',
}

const roleBadge: Record<string, string> = {
  관리자: 'badge badge-blue',
  편집자: 'badge badge-yellow',
  뷰어: 'badge badge-gray',
}

const avatarColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-teal-500',
]

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">사용자 관리</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            총 {users.length}명의 사용자가 등록되어 있습니다.
          </p>
        </div>
        <button className="btn-primary self-start sm:self-auto">
          <UserPlus className="w-4 h-4" />
          사용자 추가
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="사용자 검색..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 rounded-lg outline-none transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
          </div>
          <button className="btn-secondary self-start">
            <Filter className="w-4 h-4" />
            필터
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="table-header">사용자</th>
                <th className="table-header hidden sm:table-cell">역할</th>
                <th className="table-header">상태</th>
                <th className="table-header hidden md:table-cell">가입일</th>
                <th className="table-header text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user, i) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                          avatarColors[i % avatarColors.length]
                        }`}
                      >
                        <span className="text-white text-xs font-bold">{user.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell hidden sm:table-cell">
                    <span className={roleBadge[user.role]}>{user.role}</span>
                  </td>
                  <td className="table-cell">
                    <span className={statusBadge[user.status]}>{user.status}</span>
                  </td>
                  <td className="table-cell hidden md:table-cell text-gray-500 dark:text-gray-400">
                    {user.joined}
                  </td>
                  <td className="table-cell text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                        수정
                      </button>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <button className="text-xs text-red-600 dark:text-red-400 hover:underline">
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            1 - {users.length} / {users.length}명 표시
          </p>
          <div className="flex items-center gap-1">
            <button className="btn-secondary px-3 py-1.5 text-xs" disabled>
              이전
            </button>
            <button className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg">1</button>
            <button className="btn-secondary px-3 py-1.5 text-xs" disabled>
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
