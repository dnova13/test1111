import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, ShoppingBag, BarChart3, Settings,
  FileText, Bell, Shield, ChevronLeft, X,
} from 'lucide-react'
import { useSidebar } from '../../contexts/SidebarContext'
import clsx from 'clsx'

const navItems = [
  { label: '대시보드', icon: LayoutDashboard, to: '/' },
  { label: '사용자', icon: Users, to: '/users' },
  { label: '상품', icon: ShoppingBag, to: '/products' },
  { label: '주문', icon: FileText, to: '/orders' },
  { label: '분석', icon: BarChart3, to: '/analytics' },
  { label: '알림', icon: Bell, to: '/notifications' },
  { label: '권한', icon: Shield, to: '/roles' },
  { label: '설정', icon: Settings, to: '/settings' },
]

export default function Sidebar() {
  const { collapsed, mobileOpen, toggleCollapsed, closeMobile } = useSidebar()
  const location = useLocation()

  const content = (
    <aside
      className={clsx(
        'flex flex-col h-full bg-white dark:bg-gray-900',
        'border-r border-gray-200 dark:border-gray-700',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'w-[72px]' : 'w-[260px]',
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400 truncate">
            AdminPanel
          </span>
        )}
        <button
          onClick={toggleCollapsed}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 ml-auto"
        >
          <ChevronLeft className={clsx('w-5 h-5 transition-transform', collapsed && 'rotate-180')} />
        </button>
        <button
          onClick={closeMobile}
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 ml-auto"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map(({ label, icon: Icon, to }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
          return (
            <NavLink
              key={to}
              to={to}
              onClick={closeMobile}
              className={clsx('sidebar-item', isActive && 'active', collapsed && 'justify-center')}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* User */}
      <div className={clsx(
        'flex items-center gap-3 p-4 border-t border-gray-200 dark:border-gray-700',
        collapsed && 'justify-center',
      )}>
        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          A
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">관리자</p>
            <p className="text-xs text-gray-500 truncate">admin@example.com</p>
          </div>
        )}
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex flex-shrink-0">{content}</div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={closeMobile} />
          <div className="relative z-50 flex h-full">{content}</div>
        </div>
      )}
    </>
  )
}
