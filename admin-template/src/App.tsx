import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { SidebarProvider } from './contexts/SidebarContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-2">
      <p className="text-2xl font-bold text-gray-300 dark:text-gray-600">{title}</p>
      <p className="text-sm text-gray-400">준비 중입니다</p>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<PlaceholderPage title="상품 관리" />} />
              <Route path="/orders" element={<PlaceholderPage title="주문 관리" />} />
              <Route path="/analytics" element={<PlaceholderPage title="분석" />} />
              <Route path="/notifications" element={<PlaceholderPage title="알림" />} />
              <Route path="/roles" element={<PlaceholderPage title="권한 관리" />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
  )
}
