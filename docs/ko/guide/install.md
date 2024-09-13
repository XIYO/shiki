# 설치

<Badges name="shiki" />

npm을 통해 설치하거나 [CDN 사용법](#cdn-usage)을 참조하세요:
::: code-group

```sh [npm]
npm install -D shiki
```

```sh [yarn]
yarn add -D shiki
```

```sh [pnpm]
pnpm add -D shiki
```

```sh [bun]
bun add -D shiki
```

:::

## 통합

다음과 같은 통합 기능도 제공합니다:

- [markdown-it 플러그인](/packages/markdown-it)
- [Rehype 플러그인](/packages/rehype)
- [TypeScript Twoslash 통합](/packages/twoslash)
- [Monaco 에디터 구문 강조](/packages/monaco)
- [CLI](/packages/cli)
- [일반 트랜스포머](/packages/transformers)

## 사용법

### 간편 사용법

`shiki`를 빠르게 시작하려면 제공된 간편 함수들을 사용할 수 있습니다. 이 함수들은 필요한 테마와 언어를 로드하며, 자동으로 메모리에 캐시됩니다.

`lang`과 `theme`을 지정한 상태로 `codeToHtml` 함수에 코드 스니펫을 전달하면, 페이지에 삽입할 수 있는 하이라이트된 HTML 문자열이 반환됩니다. 생성된 HTML에는 각 토큰에 대한 인라인 스타일이 포함되어 있어 별도의 CSS 없이 스타일을 적용할 수 있습니다.

```ts twoslash
import { codeToHtml } from 'shiki'

const code = 'const a = 1' // 입력 코드
const html = await codeToHtml(code, {
  lang: 'javascript',
  theme: 'vitesse-dark'
})

console.log(html) // 하이라이트된 HTML 문자열
```

좀 더 고급 사용법으로, `codeToTokens` 또는 `codeToHast`를 사용하여 중간 데이터 구조를 얻고, 직접 렌더링할 수도 있습니다:

```ts twoslash theme:min-dark
import { codeToTokens } from 'shiki'

const { tokens } = await codeToTokens('<div class="foo">bar</div>', {
  lang: 'html',
  theme: 'min-dark'
})
```

```ts twoslash theme:catppuccin-mocha
import { codeToHast } from 'shiki'

const hast = await codeToHast('.text-red { color: red; }', {
  lang: 'css',
  theme: 'catppuccin-mocha'
})
```

### Highlighter 사용법

내부적으로 WASM을 사용하고 테마 및 언어를 필요할 때 로드하기 때문에 제공된 [간편 함수들](#shorthands)은 비동기적으로 실행됩니다. 경우에 따라 코드를 동기적으로 하이라이트해야 할 때가 있으므로, `createHighlighter` 함수를 사용하여 나중에 동기적으로 사용할 수 있는 하이라이터 인스턴스를 생성할 수 있습니다.

사용법은 `codeToHtml`과 거의 동일하며, 각 테마와 언어 파일은 동적으로 가져오는 ES 모듈입니다. 성능을 최적화하려면 **명시적으로** 언어와 테마를 나열하는 것이 좋습니다.

```ts twoslash theme:nord
import { createHighlighter } from 'shiki'

// `createHighlighter`는 비동기 함수이며 내부를 초기화하고
// 지정된 테마와 언어를 로드합니다.
const highlighter = await createHighlighter({
  themes: ['nord'],
  langs: ['javascript'],
})

// 이후 로드된 테마와 언어로 동기적으로 `highlighter.codeToHtml`을 사용할 수 있습니다.
const code = highlighter.codeToHtml('const a = 1', {
  lang: 'javascript',
  theme: 'nord'
})
```

:::info 중요 사항
하이라이터 인스턴스는 **오래 지속되는 싱글톤**이어야 합니다. 어딘가에 캐시해두고 애플리케이션 전반에서 재사용할 필요가 있습니다. `createHighlighter`를 빈번히 호출하거나 반복문 내에서 호출하는 것은 피하세요.

Node.js에서 실행하는 경우, 하이라이터 인스턴스 및 동적 테마/언어 로드를 관리해주는 [간편 함수들](#shorthands)을 사용하는 것이 좋습니다.
:::

또한, 하이라이터를 생성한 후에 테마와 언어를 로드하려면 `loadTheme` 및 `loadLanguage` 메서드를 사용할 수 있습니다.

```ts twoslash
import { createHighlighter } from 'shiki'
const highlighter = await createHighlighter({ themes: [], langs: [] })
// ---cut---
// 생성 후 테마와 언어 로드
await highlighter.loadTheme('vitesse-light')
await highlighter.loadLanguage('css')
```

Shiki v1.0 이후로 모든 테마와 언어는 명시적으로 로드해야 합니다.

```ts theme:slack-dark twoslash
import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: ['slack-dark'],
  langs: ['css']
})

highlighter.codeToHtml(
  'const a = 1',
  { lang: 'javascript', theme: 'slack-dark' }
)
// @error: `javascript` 언어가 로드되지 않음

await highlighter.loadLanguage('javascript') // 언어 로드

// 이제 작동함
```

모든 테마와 언어를 로드하려면(권장하지 않음), `bundledLanguages`와 `bundledThemes`의 모든 키를 반복해서 사용할 수 있습니다.

```ts twoslash theme:poimandres
import { bundledLanguages, bundledThemes, createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  themes: Object.keys(bundledThemes),
  langs: Object.keys(bundledLanguages),
})

highlighter.codeToHtml('const a = 1', {
  lang: 'javascript',
  theme: 'poimandres'
})
```

### 세밀한 번들

`shiki`를 가져올 때 모든 테마와 언어가 비동기 청크로 번들됩니다. 일반적으로 사용하지 않으면 로드되지 않으므로 걱정할 필요는 없습니다. 하지만 번들을 제어하고 싶다면 코어를 사용하여 직접 번들을 구성할 수 있습니다.

```ts twoslash theme:material-theme-ocean
// @noErrors
// `shiki/core` 엔트리는 테마, 언어, wasm 바이너리가 포함되어 있지 않음.
import { createHighlighterCore } from 'shiki/core'

// `shiki/wasm`은 base64 문자열로 인라인된 wasm 바이너리를 포함함.
import getWasm from 'shiki/wasm'

// 테마와 언어 모듈을 직접 가져오면, 가져온 항목만 번들됨.
import nord from 'shiki/themes/nord.mjs'

const highlighter = await createHighlighterCore({
  themes: [
    // 문자열 대신 가져온 모듈을 전달해야 함
    nord,
    // 청크 분할을 원하면 동적 가져오기 사용
    import('shiki/themes/material-theme-ocean.mjs')
  ],
  langs: [
    import('shiki/langs/javascript.mjs'),
    // shiki는 기본 내보내기와 상호작용을 시도함
    () => import('shiki/langs/css.mjs'),
    // 또는 커스텀 문법을 반환하는 getter 사용
    async () => JSON.parse(await fs.readFile('my-grammar.json', 'utf-8'))
  ],
  loadWasm: getWasm
})

// 선택적으로, 생성 후 테마와 언어 로드 가능
await highlighter.loadTheme(import('shiki/themes/vitesse-light.mjs'))

const code = highlighter.codeToHtml('const a = 1', {
  lang: 'javascript',
  theme: 'material-theme-ocean'
})
```

::: info
[간편 함수들](#shorthands)은 [번들 사용법](#bundled-usage)에서만 제공됩니다. 세밀한 번들을 사용하려면, [`createSingletonShorthands`](https://github.com/shikijs/shiki/blob/main/packages/core/src/bundle-factory.ts)를 사용하거나 직접 포팅할 수 있습니다.
:::

### 번들 프리셋

쉽게 사용할 수 있는 사전 구성된 번들도 제공하며, 이에 대한 자세한 내용은 [번들 섹션](/guide/bundles)에서 확인할 수 있습니다.

### CJS 사용법

`shiki`는 패키지 크기를 줄이기 위해 ESM 전용으로 게시되었습니다. Node.js는 CJS에서 ESM 모듈을 동적으로 가져오는 것을 지원하므로, CJS에서도 사용할 수 있습니다.

예를 들어, 다음 ESM 코드를:

```ts twoslash
// ESM
import { createHighlighter } from 'shiki'

async function main() {
  const highlighter = await createHighlighter({
    themes: ['vitesse-dark'],
    langs: ['javascript'],
  })

  const code = highlighter.codeToHtml('const a = 1', {
    theme: 'vitesse-dark',
    lang: 'javascript',
  })
}
```

CJS로 작성하면:

```ts twoslash
// CJS
async function main() {
  const { createHighlighter } = await import('shiki')

  const highlighter = await createHighlighter({
    themes: ['vitesse-dark'],
    langs: ['javascript'],
  })

  const code = highlighter.codeToHtml('const a = 1', {
    theme: 'vitesse-dark',
    lang: 'javascript'
  })
}
```

### CDN 사용법

브라우저에서 CDN을 통해 `shiki`를 사용하려면 [esm.run](https://esm.run) 또는 [esm.sh](https://esm.sh)을 사용할 수 있습니다.

```html theme:rose-pine
<body>
  <div id="foo"></div>

  <script type="module">
    // 정확한 버전을 명시하는 것이 좋음
    import { codeToHtml } from 'https://esm.sh/shiki@1.0.0'
    // 또는
    // import { codeToHtml } from 'https://esm.run/shiki@1.0.0'

    const foo = document.getElementById('foo')
    foo.innerHTML = await codeToHtml('console.log("Hi, Shiki on CDN :)")', {
      lang: 'js',
      theme: 'rose-pine'
    })
  </script>
</body>
```

이 방식은 매우 효율적이며, 언어와 테마는 필요할 때만 로드됩니다. 위 코드 스니펫의 경우, 총 4개의 요청(`shiki`, `shiki/themes/vitesse-light.mjs`, `shiki/langs/javascript.mjs`, `shiki/wasm.mjs`)이 발생하며, 전송되는 데이터는 약 200KB입니다.

[데모](https://jsfiddle.net/t7brz23v/)

### Cloudflare Workers

Cloudflare Workers는 [WebAssembly를 바이너리 데이터로 초기화하는 것을 지원하지 않습니다](https://community.cloudflare.com/t/fixed-cloudflare-workers-slow-with-moderate-sized-webassembly-bindings/184668/3). 따라서 기본 wasm 빌드는 작동하지 않으며, wasm을 자산으로 업로드하고 직접 가져와야 합니다.

또한, 번들 크기를 줄이기 위해 [세밀한 번들](#fine-grained-bundle) 방식을 사용하는 것이 좋습니다.

```ts twoslash theme:nord
// @noErrors
import { createHighlighterCore, loadWasm } from 'shiki/core'
import nord from 'shiki/themes/nord.mjs'
import js from 'shiki/langs/javascript.mjs'

// wasm을 자산으로 가져옴
await loadWasm(import('shiki/onig.wasm'))

export default {
  async fetch() {
    const highlighter = await createHighlighterCore({
      themes: [nord],
      langs: [js],
    })

    return new Response(highlighter.codeToHtml('console.log(\'shiki\');', {
      theme: 'nord',
      lang: 'js'
    }))
  },
}
```
