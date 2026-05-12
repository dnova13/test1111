'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Menu, Search, Bell, Sun, Moon, Monitor, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

interface HeaderProps {
  onMobileMenuOpen: () => void
}

export default function Header({ onMobileMenuOpen }: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const ThemeIcon = () => {
    if (!mounted) return <Sun className="w-5 h-5" />
    if (theme === 'dark') return <Moon className="w-5 h-5" />
    if (theme === 'system') return <Monitor className="w-5 h-5" />
    return <Sun className="w-5 h-5" />
  }

  const themeLabel = !mounted
    ? '테마'
    : theme === 'dark'
    ? '다크 모드'
    : theme === 'system'
    ? '시스템 설정'
    : '라이트 모드'

  const notifications = [
    { id: 1, text: '새로운 사용자가 가입했습니다.', time: '5분 전', read: false },
    { id: 2, text: '주문 #1234가 완료되었습니다.', time: '1시간 전', read: false },
    { id: 3, text: '시스템 업데이트가 완료되었습니다.', time: '3시간 전', read: true },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-4 flex-shrink-0">
      {/* Mobile menu button */}
      <button
        onClick={onMobileMenuOpen}
        className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="메뉴 열기"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="검색..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 rounded-lg outline-none transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Theme toggle */}
        <button
          onClick={cycleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={themeLabel}
          title={themeLabel}
        >
          <ThemeIcon />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v)
              setProfileOpen(false)
            }}
            className="relative flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="알림"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {notifOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setNotifOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">알림</h3>
                  {unreadCount > 0 && (
                    <span className="badge badge-blue">{unreadCount} 새 알림</span>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={clsx(
                        'px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors',
                        !n.read && 'bg-blue-50/50 dark:bg-blue-900/10'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {!n.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        )}
                        {n.read && <div className="w-2 h-2 flex-shrink-0" />}
                        <div>
                          <p className="text-sm text-gray-900 dark:text-gray-100">{n.text}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline w-full text-center">
                    모든 알림 보기
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v)
              setNotifOpen(false)
            }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AD</span>
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
              관리자
            </span>
            <ChevronDown className="hidden sm:block w-4 h-4 text-gray-400" />
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">관리자</p>
                  <p className="text-xs text-gray-400 truncate">admin@example.com</p>
                </div>
                <div className="py-1">
                  {['프로필 설정', '계정 설정', '로그아웃'].map((item) => (
                    <button
                      key={item}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
