'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor, Save, Bell, Shield, Globe, Palette } from 'lucide-react'
import { clsx } from 'clsx'

type ThemeOption = 'light' | 'dark' | 'system'

const themeOptions: { value: ThemeOption; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'light', label: '라이트 모드', icon: Sun },
  { value: 'dark', label: '다크 모드', icon: Moon },
  { value: 'system', label: '시스템 설정', icon: Monitor },
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">설정</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          계정 및 앱 환경을 설정합니다.
        </p>
      </div>

      {/* Appearance section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">화면 테마</h2>
            <p className="text-xs text-gray-400">앱의 색상 테마를 선택합니다.</p>
          </div>
        </div>
        <div className="px-6 py-5">
          {mounted ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {themeOptions.map(({ value, label, icon: Icon }) => {
                const selected = theme === value
                return (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={clsx(
                      'flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left',
                      selected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
                    )}
                  >
                    <div
                      className={clsx(
                        'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                        selected
                          ? 'bg-blue-100 dark:bg-blue-800'
                          : 'bg-gray-100 dark:bg-gray-700'
                      )}
                    >
                      <Icon
                        className={clsx(
                          'w-5 h-5',
                          selected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'
                        )}
                      />
                    </div>
                    <div>
                      <p
                        className={clsx(
                          'text-sm font-medium',
                          selected
                            ? 'text-blue-700 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-200'
                        )}
                      >
                        {label}
                      </p>
                      {selected && (
                        <p className="text-xs text-blue-500 dark:text-blue-400 mt-0.5">현재 선택됨</p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-20 rounded-xl bg-gray-100 dark:bg-gray-700 animate-pulse" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notifications section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">알림 설정</h2>
            <p className="text-xs text-gray-400">받을 알림 유형을 선택합니다.</p>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[
            { label: '이메일 알림', desc: '중요 업데이트를 이메일로 받습니다.', defaultOn: true },
            { label: '주문 알림', desc: '새 주문 시 즉시 알림을 받습니다.', defaultOn: true },
            { label: '사용자 가입 알림', desc: '신규 사용자 가입 시 알림을 받습니다.', defaultOn: false },
            { label: '마케팅 알림', desc: '프로모션 및 업데이트 정보를 받습니다.', defaultOn: false },
          ].map(({ label, desc, defaultOn }) => (
            <div key={label} className="px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input type="checkbox" defaultChecked={defaultOn} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 transition-colors" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="w-9 h-9 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">보안 설정</h2>
            <p className="text-xs text-gray-400">계정 보안을 강화합니다.</p>
          </div>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                현재 비밀번호
              </label>
              <input
                type="password"
                placeholder="현재 비밀번호 입력"
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:border-blue-500 transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                새 비밀번호
              </label>
              <input
                type="password"
                placeholder="새 비밀번호 입력"
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:border-blue-500 transition-colors text-gray-900 dark:text-gray-100 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                2단계 인증 (2FA)
              </p>
              <p className="text-xs text-gray-400 mt-0.5">계정 보안을 강화합니다.</p>
            </div>
            <button className="btn-secondary text-xs">설정하기</button>
          </div>
        </div>
      </div>

      {/* Language section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">언어 및 지역</h2>
            <p className="text-xs text-gray-400">표시 언어와 지역을 설정합니다.</p>
          </div>
        </div>
        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
              언어
            </label>
            <select className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:border-blue-500 transition-colors text-gray-900 dark:text-gray-100">
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
              시간대
            </label>
            <select className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:border-blue-500 transition-colors text-gray-900 dark:text-gray-100">
              <option value="Asia/Seoul">Asia/Seoul (KST, UTC+9)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={clsx(
            'btn-primary',
            saved && 'bg-green-600 hover:bg-green-700'
          )}
        >
          <Save className="w-4 h-4" />
          {saved ? '저장 완료!' : '변경사항 저장'}
        </button>
      </div>
    </div>
  )
}
