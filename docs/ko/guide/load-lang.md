# 사용자 정의 언어 로드

먼저 [모든 내장 언어](/languages)를 확인하세요.

TextMate 문법 객체를 `langs` 배열에 전달하여 사용자 정의 언어를 로드할 수 있습니다.

```ts twoslash
// @noErrors
import { createHighlighter } from 'shiki'

const myLang = JSON.parse(fs.readFileSync('my-lang.json', 'utf8'))

const highlighter = await createHighlighter({
  langs: [myLang],
  themes: ['vitesse-light']
})

const html = highlighter.codeToHtml(code, {
  lang: 'my-lang',
  theme: 'vitesse-light'
})
```

하이라이터를 생성한 후에도 언어를 로드할 수 있습니다.

```ts twoslash
// @noErrors
import { createHighlighter } from 'shiki'

const myLang = JSON.parse(fs.readFileSync('my-lang.json', 'utf8'))

const highlighter = await createHighlighter({
  langs: [],
  themes: ['vitesse-light'],
})

await highlighter.loadLanguage(myLang) // <-- 언어 로드

const html = highlighter.codeToHtml(code, {
  lang: 'my-lang',
  theme: 'vitesse-light'
})
```

## v0.14에서 마이그레이션

v1.0 이후로, `shiki`는 환경에 구애받지 않으므로 파일 시스템에 접근할 수 없습니다. 이는 `shiki@0.14`에서 지원했던 `path` 속성이 v1.0에서는 사용할 수 없음을 의미하며, 파일을 직접 읽어 객체로 전달해야 합니다.

예를 들어, 다음 코드는 작동하지 않습니다:

```ts
const highlighter = await createHighlighter({
  langs: [
    {
      name: 'vue-vine',
      scopeName: 'source.vue-vine',
      // ‼️ 이 코드는 작동하지 않음!
      path: join(__dirname, './vine-ts.tmLanguage.json'),
      embeddedLangs: [
        'vue-html',
        'css',
        'scss',
        'sass',
        'less',
        'stylus',
      ],
    },
  ],
  themes: []
})
```

대신, 파일을 직접 로드하세요 (`fs`, `import()`, `fetch()` 등을 통해):

```ts
const vineGrammar = JSON.parse(fs.readFileSync(join(__dirname, './vine-ts.tmLanguage.json'), 'utf8'))

const highlighter = await createHighlighter({
  langs: [
    {
      name: 'vue-vine',
      scopeName: 'source.vue-vine',
      embeddedLangs: [
        'vue-html',
        'css',
        'scss',
        'sass',
        'less',
        'stylus',
      ],
      ...vineGrammar
    },
  ],
  themes: []
})
```

## 사용자 정의 언어 별칭

`langAlias` 옵션을 사용하여 사용자 정의 언어 별칭을 등록할 수 있습니다. 예를 들어:

```ts twoslash
import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  langs: ['javascript'],
  langAlias: { // [!code hl:3]
    mylang: 'javascript',
  },
  themes: ['nord']
})

const code = highlighter.codeToHtml('const a = 1', {
  lang: 'mylang', // [!code hl]
  theme: 'nord'
})
```
