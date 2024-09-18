---
outline: deep
---

# @shikijs/transformers

<Badges name="@shikijs/transformers" />

[shiki-processor](https://github.com/innocenzi/shiki-processor)에서 영감을 받은 Shiki의 공통 변환기.

## 설치

```bash
npm i -D @shikijs/transformers
```

## 사용법

```ts twoslash
// [!code highlight:5]
import {
  transformerNotationDiff,
  // ...
} from '@shikijs/transformers'
import {
  codeToHtml,
} from 'shiki'

const code = `console.log('hello')`
const html = await codeToHtml(code, {
  lang: 'ts',
  theme: 'nord',
  transformers: [
    transformerNotationDiff(), // [!code highlight]
    // ...
  ],
})
```

## 스타일 없음

변환기는 클래스만 적용되며, 스타일은 포함되지 않습니다. 올바르게 스타일링하려면 직접 CSS 규칙을 제공해야 합니다.

## 변환기

### `transformerNotationDiff`

`[!code ++]`와 `[!code --]`를 사용해 추가 및 제거된 줄을 표시합니다.

````md
```ts
console.log('hewwo') // [\!code --]
console.log('hello') // [\!code ++]
console.log('goodbye')
```
````

렌더링 (사용자 정의 CSS 규칙 적용):

```ts
console.log('hewwo') // [!code --]
console.log('hello') // [!code ++]
console.log('goodbye')
```

- `// [!code ++]`: `<span class="line diff add">`로 출력
- `// [!code --]`: `<span class="line diff remove">`로 출력
- 외부 `<pre>` 태그 변경: `<pre class="has-diff">`

::: details HTML 출력

```html
<!-- 스타일 속성 제외한 출력 -->
<pre class="shiki has-diff"> <!-- Notice `has-diff` -->
  <code>
    <span class="line"></span>
    <span class="line"><span>function</span><span>()</span><span></span><span>{</span></span>
    <span class="line diff remove">  <!-- Notice `diff` and `remove` -->
      <span></span><span>console</span><span>.</span><span>log</span><span>(</span><span>&#39;</span><span>hewwo</span><span>&#39;</span><span>) </span>
    </span>
    <span class="line diff add">  <!-- Notice `diff` and `add` -->
      <span></span><span>console</span><span>.</span><span>log</span><span>(</span><span>&#39;</span><span>hello</span><span>&#39;</span><span>) </span>
    </span>
    <span class="line"><span></span><span>}</span></span>
    <span class="line"><span></span></span>
  </code>
</pre>
```

:::

---

### `transformerNotationHighlight`

`[!code highlight]`를 사용해 줄을 강조합니다.

````md
```ts
console.log('Not highlighted')
console.log('Highlighted') // [\!code highlight]
console.log('Not highlighted')
```
````

렌더링 (사용자 정의 CSS 규칙 적용):

```ts
console.log('Not highlighted')
console.log('Highlighted') // [!code highlight]
console.log('Not highlighted')
```

- `// [!code highlight]`: `<span class="line highlighted">`로 출력
- 외부 `<pre>` 태그 변경: `<pre class="has-highlighted">`

하나의 주석으로 여러 줄을 강조할 수도 있습니다:

````md
```ts
// [\!code highlight:3]
console.log('Highlighted')
console.log('Highlighted')
console.log('Not highlighted')
```
````

렌더링:

```ts
// [!code highlight:3]
console.log('Highlighted')
console.log('Highlighted')
console.log('Not highlighted')
```

---

### `transformerNotationWordHighlight`

`[!code word:Hello]`를 사용해 이후 코드에서 `Hello`라는 단어를 강조합니다.

````md
```ts
// [\!code word:Hello]
const message = 'Hello World'
console.log(message) // prints Hello World
```
````

렌더링 (사용자 정의 CSS 규칙 적용):

```ts
// [!code word:Hello]
const message = 'Hello World'
console.log(message) // prints Hello World
```

매칭된 단어는 `<span class="highlighted-word">Hello</span>`로 출력됩니다.

특정 줄에만 단어를 강조하려면, `[!code word:Hello:1]`과 같이 작성하여 다음 줄에서만 `Hello`를 강조할 수 있습니다.

````md
```ts
// [\!code word:Hello:1]
const message = 'Hello World'
console.log(message) // prints Hello World
```
````

렌더링:

```ts
// [!code word:Hello:1]
const message = 'Hello World'
console.log(message) // prints Hello World
```

---

### `transformerNotationFocus`

`[!code focus]`를 사용해 줄을 포커스합니다.

````md
```ts
console.log('Not focused');
console.log('Focused') // [\!code focus]
console.log('Not focused');
```
````

렌더링 (사용자 정의 CSS 규칙 적용):

```ts
console.log('Not focused')
console.log('Focused') // [!code focus]
console.log('Not focused')
```

- 출력: `<span class="line focused">`
- 외부 `<pre>` 태그 변경: `<pre class="has-focused">`

하나의 주석으로 여러 줄을 포커스할 수도 있습니다:

````md
```ts
// [\!code focus:3]
console.log('Focused')
console.log('Focused')
console.log('Not focused')
```
````

렌더링:

```ts
// [!code focus:3]
console.log('Focused')
console.log('Focused')
console.log('Not focused')
```

---

### `transformerNotationErrorLevel`

`[!code error]`와 `[!code warning]`을 사용해 줄을 오류 또는 경고로 표시합니다.

````md
```ts
console.log('No errors or warnings')
console.error('Error') // [\!code error]
console.warn('Warning') // [\!code warning]
```
````

- 오류의 경우: `<span class="line highlighted error">`로 출력
- 경고의 경우: `<span class="line highlighted warning">`로 출력
- 외부 `<pre>` 태그 변경: `<pre class="has-highlighted">`

추가 CSS 규칙을 적용하면 이렇게 표시할 수 있습니다:

```ts
console.log('No errors or warnings')
console.error('Error') // [!code error]
console.warn('Warning') // [!code warning]
```

---

### `transformerRenderWhitespace`

공백(탭 및 스페이스)을 개별적인 `<span>` 요소로 렌더링하고, 클래스는 `tab`과 `space`를 사용합니다.

추가 CSS 규칙을 적용하면 이렇게 표시할 수 있습니다:

<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre v-pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;" tabindex="0"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">function</span><span class="space"> </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">block</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>
<span class="line"><span class="space"> </span><span class="space"> </span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">space</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span class="tab">&#9;</span><span class="tab">&#9;</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">tab</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span class="space"> </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre></div>

::: details 예시 CSS

```css
.vp-code .tab,
.vp-code .space {
  position: relative;
}

.vp-code .tab::before {
  content: '⇥';
  position: absolute;
  opacity: 0.3;
}

.vp-code .space::before {
  content: '·';
  position: absolute;
  opacity: 0.3;
}
```

:::

---

### `transformerMetaHighlight`

코드 스니펫에 제공된 [메타 문자열](/ko/guide/transformers#meta)에 따라 줄을 강조합니다.

````md
```js {1,3-4}
console.log('1')
console.log('2')
console.log('3')
console.log('4')
```
````

렌더링 (사용자 정의 CSS 규칙 적용):

```js {1,3-4}
console.log('1')
console.log('2')
console.log('3')
console.log('4')
```

- 지정된 줄은 `<span class="line highlighted">`로 출력됩니다.

### `transformerMetaWordHighlight`

코드 스니펫에 제공된 메타 문자열에 따라 단어를 강조합니다.

````md
```js /Hello/
const msg = 'Hello World'
console.log(msg)
console.log(msg) // prints Hello World
```
````

렌더링 (사용자 정의 CSS 규칙 적용):

```js /Hello/
const msg = 'Hello World'
console.log(msg) // prints Hello World
```

매칭된 단어는 `<span class="highlighted-word">Hello</span>`로 출력됩니다.

---

### `transformerCompactLineOptions`

`shiki`에서 제거된 `lineOptions`에 대한 지원.

---

### `transformerRemoveLineBreak`

`<span class="line">` 사이의 줄바꿈을 제거합니다. CSS에서 `.line`에 `display: block`을 설정할 때 유용합니다.

---

### `transformerRemoveNotationEscape`

`// [\!code ...]`를 `// [!code ...]`로 변환합니다.
이렇게 하면 이스케이프된 주석 구문이 그대로 렌더링되는 것을 방지할 수 있습니다.
