import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

const GUIDES: DefaultTheme.NavItemWithLink[] = [
  { text: '시작하기', link: '/ko/guide/' },
  { text: '설치', link: '/ko/guide/install' },
  { text: '번들', link: '/ko/guide/bundles' },
  { text: '이중 테마', link: '/ko/guide/dual-themes' },
  { text: '장식', link: '/ko/guide/decorations' },
  { text: '변환기', link: '/ko/guide/transformers' },
  { text: '테마 색상 조작', link: '/ko/guide/theme-colors' },
  { text: '마이그레이션', link: '/ko/guide/migrate' },
  { text: '호환성 빌드', link: '/ko/guide/compat' },
  { text: '커스텀 테마', link: '/ko/guide/load-theme' },
  { text: '커스텀 언어', link: '/ko/guide/load-lang' },
]

const REFERENCES: DefaultTheme.NavItemWithLink[] = [
  { text: '테마', link: '/ko/themes' },
  { text: '언어', link: '/ko/languages' },
]

const INTEGRATIONS: DefaultTheme.NavItemWithLink[] = [
  { text: 'TypeScript Twoslash', link: '/ko/packages/twoslash' },
  { text: 'markdown-it', link: '/ko/packages/markdown-it' },
  { text: 'Rehype', link: '/ko/packages/rehype' },
  { text: 'Monaco Editor', link: '/ko/packages/monaco' },
  { text: 'VitePress', link: '/ko/packages/vitepress' },
  { text: 'Nuxt', link: '/ko/packages/nuxt' },
  { text: 'Next', link: '/ko/packages/next' },
  { text: 'Astro', link: '/ko/packages/astro' },
  { text: '공통 변환기', link: '/ko/packages/transformers' },
  { text: 'CLI', link: '/ko/packages/cli' },
]

const VERSIONS: (DefaultTheme.NavItemWithLink | DefaultTheme.NavItemChildren)[] = [
  { text: `v1.x (현재)`, link: '/ko/' },
  { text: `릴리스 노트`, link: 'https://github.com/shikijs/shiki/releases' },
  { text: `기여`, link: 'https://github.com/shikijs/shiki/blob/main/CONTRIBUTING.md' },
  {
    items: [
      { text: 'v0.14에서 마이그레이션', link: '/ko/guide/migrate#migrate-from-v0-14' },
      { text: 'Shikiji에서 마이그레이션', link: '/ko/guide/migrate#migrate-from-shikiji' },
    ],
  },
]

export const ko = defineConfig({
  lang: 'ko-KR',
  title: 'Shiki 한국어 문서',
  description: '아름답고 강력한 구문 강조 도구',

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      {
        text: '가이드',
        items: GUIDES,
      },
      {
        text: '통합',
        items: INTEGRATIONS,
      },
      {
        text: '참조',
        items: REFERENCES,
      },
      {
        text: '버전',
        items: VERSIONS,
      },
    ],

    sidebar: {
      '/ko/': [
        {
          text: '가이드',
          items: GUIDES,
        },
        {
          text: '통합',
          items: INTEGRATIONS,
        },
        {
          text: '참조',
          items: REFERENCES,
        },
      ],
    },

    editLink: {
      pattern: 'https://github.com/shikijs/shiki/edit/main/docs/:path',
      text: '이 페이지 편집 제안하기',
    },

    footer: {
      message: 'MIT 라이선스 하에 배포됨.',
      copyright: 'Copyright © 2019-present Evan You',
    },

    docFooter: {
      prev: '이전',
      next: '다음',
    },

    outline: {
      label: '이 페이지 목차',
    },

    lastUpdated: {
      text: '업데이트 날짜',
    },

    langMenuLabel: '언어 변경',
    returnToTopLabel: '맨 위로 돌아가기',
    sidebarMenuLabel: '사이드바 메뉴',
    darkModeSwitchLabel: '다크 모드',
    lightModeSwitchTitle: '라이트 모드로 변경',
    darkModeSwitchTitle: '다크 모드로 변경',
  },
})
