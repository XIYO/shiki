# 데코레이션

데코레이션 API를 제공하여 코드의 특정 범위에 커스텀 클래스와 속성을 래핑할 수 있습니다.

```ts twoslash
import { codeToHtml } from 'shiki'

const code = `
const x = 10
console.log(x)
`.trim()

const html = await codeToHtml(code, {
  theme: 'vitesse-light',
  lang: 'ts',
  decorations: [ // [!code hl:8]
    {
      // 줄과 문자는 0부터 시작합니다
      start: { line: 1, character: 0 },
      end: { line: 1, character: 11 },
      properties: { class: 'highlighted-word' }
    }
  ]
})
```

결과는 다음과 같습니다 (예제에서는 CSS로 스타일링됨):

```ts
// @decorations:[{"start":{"line":1,"character":0},"end":{"line":1,"character":11},"properties":{"class":"highlighted-word"}}]
const x = 10
console.log(x)
```

위치는 코드에 대한 0부터 시작하는 오프셋으로도 지정할 수 있습니다:

```ts twoslash
import { codeToHtml } from 'shiki'

const code = `
const x = 10
console.log(x)
`.trim()
// ---cut---
const html = await codeToHtml(code, {
  theme: 'vitesse-light',
  lang: 'ts',
  decorations: [ // [!code hl:7]
    {
      start: 21,
      end: 24,
      properties: { class: 'highlighted-word' }
    }
  ]
})
```

렌더링된 결과는 다음과 같습니다:

```ts
// @decorations:[{"start":21,"end":24,"properties":{"class":"highlighted-word"}}]
const x = 10
console.log(x)
```

## 트랜스포머에서 데코레이션 사용하기

고급 사용 사례에서는 [Transformers API](./transformers.md)를 사용하여 토큰과 HAST 트리에 완전히 접근할 수 있습니다.

트랜스포머 내에서 데코레이션을 추가하려면 다음과 같이 할 수 있습니다:

```ts twoslash
/* eslint-disable import/no-duplicates */
import { DecorationItem } from 'shiki'
function doSomethingWithCode(code: string): DecorationItem[] {
  return []
}
const code: string = ''

// ---cut---
import { ShikiTransformer, codeToHtml } from 'shiki'

const myTransformer: ShikiTransformer = {
  name: 'my-transformer',
  preprocess(code, options) {
    // 어떻게든 데코레이션을 생성합니다
    const decorations = doSomethingWithCode(code)

    // 데코레이션 배열이 존재하는지 확인합니다
    options.decorations ||= []
    // 데코레이션을 추가합니다
    options.decorations.push(...decorations)
  }
}

const html = await codeToHtml(code, {
  theme: 'vitesse-light',
  lang: 'ts',
  transformers: [
    myTransformer
  ]
})
```

데코레이션은 `preprocess` 훅에서만 또는 그 이전에만 제공할 수 있다는 점을 유의하세요. 이후 훅에서 데코레이션 배열을 변경해도 무시됩니다.
