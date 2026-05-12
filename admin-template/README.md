# Admin Template — React + Vite

React 18 + Vite 기반 관리자 대시보드 보일러플레이트입니다.

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | React 18 + TypeScript |
| 빌드 도구 | Vite |
| 스타일링 | Tailwind CSS v3 |
| 라우팅 | React Router v6 |
| 아이콘 | Lucide React |

## 주요 기능

- **다크모드**: 시스템 설정 자동 감지 + 버튼 토글 + localStorage 저장
- **반응형 레이아웃**: 모바일 사이드바 오버레이, 데스크탑 접기/펼치기
- **페이지**: 대시보드(통계 카드 + 주문 테이블), 사용자 관리, 설정, 404

## 빠른 시작

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

## 프로젝트 구조

```
src/
├── contexts/
│   ├── ThemeContext.tsx     # 다크모드 전역 상태
│   └── SidebarContext.tsx   # 사이드바 전역 상태
├── components/
│   ├── layout/
│   │   ├── Layout.tsx      # 루트 레이아웃 (Outlet)
│   │   ├── Sidebar.tsx     # 네비게이션 사이드바
│   │   └── Header.tsx      # 상단 헤더 (검색, 알림, 다크모드 토글)
│   └── ui/
│       └── StatCard.tsx    # 통계 카드 컴포넌트
└── pages/
    ├── Dashboard.tsx        # 메인 대시보드
    ├── Users.tsx            # 사용자 관리
    ├── Settings.tsx         # 설정
    └── NotFound.tsx         # 404 페이지
```

## 네비게이션 구조

```
/               → 대시보드
/users          → 사용자 관리
/products       → 상품 관리 (placeholder)
/orders         → 주문 관리 (placeholder)
/analytics      → 분석 (placeholder)
/notifications  → 알림 (placeholder)
/roles          → 권한 관리 (placeholder)
/settings       → 설정
```

---

> Vite 기본 정보:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
