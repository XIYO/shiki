---
outline: deep
---

> [!note]
> 코드 블럭에 Twoslash 라이브러의 파싱에 오류가 있어 제거된 코드 입니다.

# VitePress 통합

[VitePress](https://vitepress.dev/)는 기본적으로 Shiki를 사용하므로 별도의 통합 작업이 필요하지 않습니다.

VitePress는 [Shiki를 커스터마이징할 수 있는 몇 가지 옵션](https://github.com/vuejs/vitepress/blob/main/src/node/markdown/markdown.ts#L66-L112)을 제공합니다. 자세한 내용은 [VitePress 문서](https://vitepress.dev/reference/site-config#markdown)를 참조하세요.

## Twoslash

VitePress에서 [TypeScript Twoslash](/packages/twoslash) (코드 스니펫에 타입 정보 표시)를 활성화하려면 간단한 설정을 위한 VitePress 플러그인을 제공합니다. 미리 스타일링된 상태로, 코드 컨테이너 외부에 타입 정보를 표시하기 위해 [Floating Vue](https://floating-vue.starpad.dev/)를 사용합니다.

<Badges name="@shikijs/vitepress-twoslash" />

### 설정

```bash
npm i -D @shikijs/vitepress-twoslash
```

[`.vitepress/config.ts`](https://vitepress.dev/reference/site-config)에 다음을 추가하세요:

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash' // [!code hl]

export default defineConfig({
  markdown: {
    codeTransformers: [
      transformerTwoslash() // [!code hl]
    ]
  }
})
```

그리고 [`.vitepress/theme/index.ts`](https://vitepress.dev/guide/custom-theme)에서 Vue 플러그인을 설치하고, `@shikijs/vitepress-twoslash/styles.css`를 가져옵니다.

```ts
// @noErrors: true
// .vitepress/theme/index.ts
import Theme from 'vitepress/theme'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client' // [!code hl]
import '@shikijs/vitepress-twoslash/style.css' // [!code hl]
import type { EnhanceAppContext } from 'vitepress'

export default {
  extends: Theme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue) // [!code hl]
  },
}
```

::: details style.css에 대하여

간단한 설정을 위해, `@shikijs/vitepress-twoslash/styles.css`는 `floating-vue`와 `@shikijs/twoslash/style-rich.css`의 스타일을 번들로 제공하므로 하나의 엔트리만 필요합니다. 만약 커스텀 `floating-vue` 스타일을 사용하거나 스타일을 더 세밀하게 제어하고 싶다면, 다음과 같이 확장할 수 있습니다:

```ts
import '@shikijs/vitepress-twoslash/style.css'

// 다음과 동일:
import '@shikijs/twoslash/style-rich.css'
import 'floating-vue/dist/style.css'
import '@shikijs/vitepress-twoslash/style-core.css'
```

:::

이제 마크다운 파일에서 `ts twoslash`를 사용하여 아름다운 타입 호버를 활성화할 수 있습니다.

````md
```ts
console.log('hello')
//      ^?
```
````

결과는 다음과 같이 렌더링됩니다:

```ts
console.log('hello')
//      ^?
```

<br> <!-- 위의 설명을 위한 공백 -->

### Vue 단일 파일 컴포넌트

또한 이 플러그인은 [`twoslash-vue`](https://twoslash.netlify.app/packages/vue)와 통합되어 있어, `vue twoslash`를 사용하여 Vue SFC 블록도 강조할 수 있습니다:

```vue
<script setup>
import { onMounted, ref } from 'vue'

// reactive state
const count = ref(0)
//             ^?

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">
    Count is: {{ count }}
  </button>
</template>
```
