import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <p className="text-8xl font-bold text-gray-200 dark:text-gray-700">404</p>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">페이지를 찾을 수 없습니다</h2>
      <p className="text-sm text-gray-500">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link to="/" className="btn-primary mt-2">대시보드로 돌아가기</Link>
    </div>
  )
}
