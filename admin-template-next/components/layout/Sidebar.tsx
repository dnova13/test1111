'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Bell,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
} from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: '대시보드', icon: LayoutDashboard },
  { href: '/dashboard/users', label: '사용자', icon: Users },
  { href: '/dashboard/products', label: '상품', icon: Package },
  { href: '/dashboard/orders', label: '주문', icon: ShoppingCart },
  { href: '/dashboard/analytics', label: '분석', icon: BarChart3 },
  { href: '/dashboard/notifications', label: '알림', icon: Bell },
  { href: '/dashboard/roles', label: '권한', icon: Shield },
  { href: '/dashboard/settings', label: '설정', icon: Settings },
]

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onCollapse: (v: boolean) => void
  onMobileClose: () => void
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  onCollapse,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={clsx(
          'flex items-center h-16 px-4 border-b border-sidebar-border flex-shrink-0',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">AdminKit</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </Link>
        )}
        {/* Desktop collapse button */}
        <button
          onClick={() => onCollapse(!collapsed)}
          className={clsx(
            'hidden lg:flex items-center justify-center w-6 h-6 rounded-md text-gray-400 hover:text-white hover:bg-sidebar-accent transition-colors',
            collapsed && 'mx-auto'
          )}
          aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-white"
          aria-label="메뉴 닫기"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={clsx(
                'nav-item',
                active ? 'nav-item-active' : 'nav-item-inactive',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Bottom user info */}
      {!collapsed && (
        <div className="px-3 py-4 border-t border-sidebar-border flex-shrink-0">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">AD</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">관리자</p>
              <p className="text-gray-400 text-xs truncate">admin@example.com</p>
            </div>
          </div>
        </div>
      )}
      {collapsed && (
        <div className="px-3 py-4 border-t border-sidebar-border flex-shrink-0 flex justify-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">AD</span>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar (drawer) */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-64 bg-sidebar flex flex-col transition-transform duration-300 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={clsx(
          'hidden lg:flex flex-col bg-sidebar transition-all duration-300 flex-shrink-0',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
