# Admin Template — Next.js 14

Next.js 14 App Router 기반 관리자 대시보드 보일러플레이트입니다.

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) + TypeScript |
| 스타일링 | Tailwind CSS v3 |
| 다크모드 | next-themes |
| 아이콘 | Lucide React |

## 주요 기능

- **다크모드**: next-themes로 SSR-safe 클래스 기반 토글, localStorage 저장
- **반응형 레이아웃**: 모바일 사이드바 오버레이, 데스크탑 접기/펼치기
- **App Router**: 레이아웃 중첩, 서버 컴포넌트 기반 구조
- **페이지**: 대시보드, 사용자 관리, 설정, 404

## 빠른 시작

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
```

## 프로젝트 구조

```
app/
├── layout.tsx              # 루트 레이아웃 (ThemeProvider 포함)
├── page.tsx                # / → /dashboard 리다이렉트
├── globals.css             # Tailwind 지시자 + 공통 컴포넌트 클래스
└── dashboard/
    ├── layout.tsx          # 대시보드 레이아웃 (사이드바 + 헤더)
    ├── page.tsx            # 대시보드 메인
    ├── users/page.tsx      # 사용자 관리
    └── settings/page.tsx   # 설정

components/
├── layout/
│   ├── Sidebar.tsx         # 네비게이션 사이드바
│   └── Header.tsx          # 상단 헤더
└── ui/
    └── StatCard.tsx        # 통계 카드

providers/
└── ThemeProvider.tsx       # next-themes 래퍼
```

## 네비게이션 구조

```
/dashboard              → 대시보드 (메인)
/dashboard/users        → 사용자 관리
/dashboard/products     → 상품 관리 (placeholder)
/dashboard/orders       → 주문 관리 (placeholder)
/dashboard/analytics    → 분석 (placeholder)
/dashboard/settings     → 설정
```
