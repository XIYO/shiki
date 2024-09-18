# 사용자 정의 테마 로드

먼저 [모든 내장 테마](/ko/themes)를 확인하세요.

`Theme` 객체를 `themes` 배열에 전달하여 사용자 정의 테마를 로드할 수 있습니다.

```ts twoslash
import { createHighlighter } from 'shiki'

const myTheme = {
  name: 'my-theme',
  settings: [
    {
      scope: ['comment'],
      settings: {
        foreground: '#888'
      }
    },
    // ...
  ]
}

const highlighter = await createHighlighter({
  themes: [myTheme],
  langs: [],
})

const code = `console.log('hello')`
const html = highlighter.codeToHtml(code, {
  lang: 'javascript',
  theme: 'my-theme'
})
```

하이라이터를 생성한 후에도 테마를 로드할 수 있습니다.

```ts twoslash
// @noErrors
import { createHighlighter } from 'shiki'

// 테마 객체를 파일, 네트워크 요청 등을 통해 로드
const myTheme = JSON.parse(fs.readFileSync('my-theme.json', 'utf8'))

const highlighter = await createHighlighter({
  langs: ['javascript'],
  themes: [],
})

await highlighter.loadTheme(myTheme) // <-- 테마 로드

const code = `console.log('hello')`
const html = highlighter.codeToHtml(code, {
  lang: 'javascript',
  theme: 'my-theme'
})
```

테마는 JavaScript 객체 형태의 TextMate 테마입니다. 예를 들어, [이런 모습일 수 있습니다](https://github.com/antfu/textmate-grammars-themes/blob/main/packages/tm-themes/themes/dark-plus.json).
