---
outline: deep
---

# @shikijs/twoslash

<Badges name="@shikijs/twoslash" />

[Twoslash](https://github.com/twoslashes/twoslash)를 위한 Shiki 변환기로, 코드 블록 안에서 인라인 타입 호버를 제공합니다.

[TwoSlash Notation Reference](https://twoslash.netlify.app/refs/notations).

## 설치

```bash
npm i -D @shikijs/twoslash
```

이 패키지는 Shiki의 **변환기 애드온**입니다. 따라서 Shiki 변환기를 전달할 수 있는 모든 통합에 이 패키지를 사용할 수 있습니다.

```ts twoslash
import {
  codeToHtml,
} from 'shiki'
import {
  transformerTwoslash,
} from '@shikijs/twoslash'

const html = await codeToHtml(`console.log()`, {
  lang: 'ts',
  theme: 'vitesse-dark',
  transformers: [
    transformerTwoslash(), // <-- 여기에 추가
    // ...
  ],
})
```

기본 출력은 스타일이 적용되지 않은 상태입니다. 스타일을 좋게 보이게 하려면 추가 CSS가 필요합니다.

Twoslash를 브라우저 또는 워커에서 실행하려면 [CDN 사용](#cdn-usage) 섹션을 참조하세요.

## 렌더러

[`hast`](https://github.com/syntax-tree/hast)의 유연성 덕분에, 이 변환기를 사용하면 AST로 출력 HTML에서 각 정보를 커스터마이징하여 렌더링할 수 있습니다.

내장된 두 가지 렌더러를 제공하며, 직접 커스터마이징할 수도 있습니다:

---

### `rendererRich`

[소스 코드](https://github.com/shikijs/shiki/blob/main/packages/twoslash/src/renderer-rich.ts)

::: tip
v0.10.0부터 기본 렌더러입니다.
:::

이 렌더러는 더 명확한 클래스 이름을 제공하며 `twoslash-`로 시작하여 스코핑을 개선합니다. 또한, 호버 정보에 대한 구문 강조 표시도 실행합니다.

```ts twoslash
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'

transformerTwoslash({
  renderer: rendererRich() // <--
})
```

다음은 내장된 [`style-rich.css`](https://github.com/shikijs/shiki/blob/main/packages/twoslash/style-rich.css)를 사용한 몇 가지 예시입니다:

<!-- eslint-skip -->

```ts twoslash
// @errors: 2540
interface Todo {
  title: string
}

const todo: Readonly<Todo> = {
  title: 'Delete inactive users'.toUpperCase(),
//  ^?
}

todo.title = 'Hello'

Number.parseInt('123', 10)
//      ^|

               //
               //
```

```ts twoslash
import { createHighlighterCore } from 'shiki/core'

const highlighter = await createHighlighterCore({})
// @log: 사용자 정의 로그 메시지
const a = 1
// @error: 사용자 정의 오류 메시지
const b = 1
// @warn: 사용자 정의 경고 메시지
const c = 1
// @annotate: 사용자 정의 주석 메시지
```

---

### `rendererClassic`

[소스 코드](https://github.com/shikijs/shiki/blob/main/packages/twoslash/src/renderer-classic.ts)

이 렌더러는 이전 [`shiki-twoslash`](https://github.com/shikijs/twoslash)의 출력과 일치합니다.

```ts twoslash
import { rendererClassic, transformerTwoslash } from '@shikijs/twoslash'

transformerTwoslash({
  renderer: rendererClassic() // <--
})
```

좋아 보이게 만들려면 `shiki-twoslash`의 CSS를 참조해야 할 수도 있습니다. [여기](https://github.com/shikijs/shiki/blob/main/packages/twoslash/style-classic.css)에 `shiki-twoslash`에서 CSS를 복사해 두었으나, 일부 정리가 필요할 수 있습니다.

### `rendererFloatingVue`

[소스 코드](https://github.com/shikijs/shiki/blob/main/packages/vitepress-twoslash/src/renderer-floating-vue.ts)

이 렌더러는 [Floating Vue](https://floating-vue.starpad.dev/)를 팝업 컴포넌트로 사용하는 Vue 템플릿 구문을 출력합니다(컨테이너 외부에서 렌더링). 이 렌더러는 **직접 사용 가능하지 않으며**, [VitePress 통합](/packages/vitepress#twoslash)을 위한 내부 렌더러입니다. 자체 렌더러를 만들고자 하는 경우 참조용으로만 나열되었습니다.

## 옵션

### 명시적 트리거

`@shikijs/markdown-it` 또는 `rehype-shiki`와 통합할 때, 모든 코드 블록에서 Twoslash가 실행되지 않도록 하고 싶을 수 있습니다. 이 경우, `explicitTrigger`를 `true`로 설정하여 코드프레임에 `twoslash`가 표시된 코드 블록에서만 실행되도록 할 수 있습니다.

```ts twoslash
import { transformerTwoslash } from '@shikijs/twoslash'

transformerTwoslash({
  explicitTrigger: true // <--
})
```

````md
마크다운에서는 다음 구문을 사용하여 Twoslash를 트리거할 수 있습니다:

```ts
// 이건 일반 코드 블록입니다
```

```ts twoslash
// 이건 Twoslash가 실행됩니다
```
````

## 통합

위의 지침을 따라 Shiki와 함께 Twoslash를 직접 설정할 수 있지만, 여기서 프레임워크와 도구를 위한 고수준 통합도 찾을 수 있습니다:

- [VitePress](/packages/vitepress#twoslash) - VitePress에서 Twoslash 지원을 활성화하는 플러그인.
- [Nuxt](/packages/nuxt#twoslash) - Nuxt Content에서 Twoslash를 활성화하는 모듈.
- [Vocs](https://vocs.dev/docs/guides/twoslash) - Vocs는 Twoslash 지원을 기본 제공.
- [Slidev](https://sli.dev/custom/highlighters.html#twoslash-integration) - Slidev는 Twoslash 지원을 기본 제공.

## 레시피

### CDN 사용

기본적으로 [`twoslash`](https://github.com/twoslashes/twoslash/tree/main/packages/twoslash)는 Node.js에서 실행되며, 가져오기 타입을 해결하기 위해 로컬 시스템에 의존합니다. Node.js가 아닌 환경에서는 직접 가져오는 것이 작동하지 않습니다.

다행히도 Twoslash는 가상 파일 시스템을 구현하여 메모리 내에서 TypeScript를 해결할 수 있도록 자체 파일을 제공할 수 있습니다. 그러나 브라우저에서 이러한 파일을 로드하는 것은 여전히 어려운 과제입니다. [TypeScript 웹사이트](https://github.com/microsoft/TypeScript-Website)에 대한 작업 덕분에 TypeScript 팀은 자동으로 타입을 가져오는 몇 가지 유틸리티를 제공하였으며, 이를 [Automatic Type Acquisition (ATA)](https://github.com/microsoft/TypeScript-Website/tree/v2/packages/ata)라고 부릅니다.

우리는 이러한 빌딩 블록을 간단하게 사용할 수 있는 API로 감싸 [`twoslash-cdn`](https://twoslash.netlify.app/packages/cdn)에서 제공합니다. 예를 들면 다음과 같습니다:

```js
// TODO: 프로덕션에서는 명시적인 버전으로 대체
import { createTransformerFactory, rendererRich } from 'https://esm.sh/@shikijs/twoslash@latest/core'
import { codeToHtml } from 'https://esm.sh/shiki@latest'
import { createStorage } from 'https://esm.sh/unstorage@latest'
import indexedDbDriver from 'https://esm.sh/unstorage@latest/drivers/indexedb'
import { createTwoslashFromCDN } from 'https://esm.sh/twoslash-cdn@latest'

// ============= 초기화 =============

// 가상 파일 시스템을 캐시하기 위해 IndexedDB와 함께 unstorage를 사용하는 예
const storage = createStorage({
  driver: indexedDbDriver({ base: 'twoslash-cdn' }),
})

const twoslash = createTwoslashFromCDN({
  storage,
  compilerOptions: {
    lib: ['esnext', 'dom'],
  },
})

const transformerTwoslash = createTransformerFactory(twoslash.runSync)({
  renderer: rendererRich(),
})

// ============= 실행 =============

const app = document.getElementById('app')

const source = `
import { ref } from 'vue'

console.log("Hi! Shiki + Twoslash on CDN :)")

const count = ref(0)
//     ^?
`.trim()

// 렌더링 전에, 타입을 준비해야 동기적으로 렌더링할 수 있습니다
await twoslash.prepareTypes(source)

// 그런 다음 코드를 렌더링할 수 있습니다
app.innerHTML = await codeToHtml(source, {
  lang: 'ts',
  theme

: 'vitesse-dark',
  transformers: [transformerTwoslash],
})
```
