import { Menu, Sun, Moon, Bell, Search } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useSidebar } from '../../contexts/SidebarContext'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { toggleMobile } = useSidebar()

  return (
    <header className="h-16 flex-shrink-0 flex items-center px-4 gap-3
      bg-white dark:bg-gray-900
      border-b border-gray-200 dark:border-gray-700">
      {/* Mobile menu trigger */}
      <button
        onClick={toggleMobile}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="검색..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg
              bg-gray-100 dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              border border-transparent
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
          aria-label="다크모드 전환"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
          A
        </div>
      </div>
    </header>
  )
}
