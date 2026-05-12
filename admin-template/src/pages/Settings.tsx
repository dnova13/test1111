import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">설정</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">관리자 설정을 변경합니다</p>
      </div>

      <div className="card divide-y divide-gray-200 dark:divide-gray-700">
        {/* Theme */}
        <div className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">다크 모드</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">화면 테마를 변경합니다</p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === 'dark' ? '라이트 모드로' : '다크 모드로'}
          </button>
        </div>

        {/* Language */}
        <div className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">언어</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">인터페이스 언어를 선택합니다</p>
          </div>
          <select className="text-sm rounded-lg border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
            px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Notification */}
        <div className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">이메일 알림</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">중요 알림을 이메일로 받습니다</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer
              peer-checked:bg-primary-600
              after:content-[''] after:absolute after:top-[2px] after:left-[2px]
              after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
              peer-checked:after:translate-x-5" />
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="btn-primary">저장</button>
        <button className="btn-secondary">취소</button>
      </div>
    </div>
  )
}
