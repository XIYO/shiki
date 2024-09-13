# 라이트/다크 듀얼 테마

Shiki는 라이트/다크 듀얼 또는 여러 테마 출력을 지원합니다. Shiki의 듀얼 테마 방식은 각 토큰의 색상을 저장하는 CSS 변수를 사용합니다.

`codeToHtml`의 `theme` 옵션을 `light`와 `dark` 키가 포함된 `options`로 변경하여 두 가지 테마를 생성할 수 있습니다.

```ts twoslash
import { codeToHtml } from 'shiki'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: { // [!code hl:4]
    light: 'min-light',
    dark: 'nord',
  }
})
```

다음 HTML이 생성됩니다 ([데모 미리보기](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shikijs/shiki/main/packages/shiki/test/out/dual-themes.html)):

```html
<pre
  class="shiki shiki-themes min-light nord"
  style="background-color:#ffffff;--shiki-dark-bg:#2e3440ff;color:#24292eff;--shiki-dark:#d8dee9ff"
  tabindex="0"
>
  <code>
    <span class="line">
      <span style="color:#1976D2;--shiki-dark:#D8DEE9">console</span>
      <span style="color:#6F42C1;--shiki-dark:#ECEFF4">.</span>
      <span style="color:#6F42C1;--shiki-dark:#88C0D0">log</span>
      <span style="color:#24292EFF;--shiki-dark:#D8DEE9FF">(</span>
      <span style="color:#22863A;--shiki-dark:#ECEFF4">"</span>
      <span style="color:#22863A;--shiki-dark:#A3BE8C">hello</span>
      <span style="color:#22863A;--shiki-dark:#ECEFF4">"</span>
      <span style="color:#24292EFF;--shiki-dark:#D8DEE9FF">)</span>
    </span>
  </code>
</pre>
```

사이트의 테마에 반응하도록 만들려면 간단한 CSS 스니펫을 추가해야 합니다.

## 쿼리 기반 다크 모드

```css
@media (prefers-color-scheme: dark) {
  .shiki,
  .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* 선택 사항: 글꼴 스타일도 추가하고 싶다면 */
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
}
```

## 클래스 기반 다크 모드

```css
html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  /* 선택 사항: 글꼴 스타일도 추가하고 싶다면 */
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
```

## 다중 테마

두 가지 이상의 테마도 지원할 수 있습니다. `themes` 객체에서 임의의 수의 테마를 지정할 수 있으며, `defaultColor` 옵션으로 기본 테마를 지정할 수 있습니다.

```ts twoslash
import { codeToHtml } from 'shiki'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: {
    light: 'github-light',
    dark: 'github-dark',
    dim: 'github-dimmed',
    // 여러 테마 추가 가능
  },

  // 선택적 커스터마이징
  defaultColor: 'light',
  cssVariablePrefix: '--shiki-'
})
```

토큰은 다음과 같이 생성됩니다:

```html
<span style="color:#1976D2;--shiki-dark:#D8DEE9;--shiki-dim:#566575">console</span>
```

그런 다음 각 테마가 언제 적용될지를 제어하는 CSS 스니펫을 업데이트합니다. 여기 예시가 있습니다:

[데모 미리보기](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shikijs/shiki/main/packages/shiki/test/out/multiple-themes.html)

### 기본 색상 없이

색상을 완전히 제어하거나 `!important`를 사용하여 덮어쓰기를 피하고 싶다면, `defaultColor`를 `false`로 설정하여 기본 색상을 비활성화할 수 있습니다.

```ts twoslash
import { codeToHtml } from 'shiki'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  },
  defaultColor: false, // <--
})
```

이 경우, 토큰은 다음과 같이 생성됩니다:

```html
<span style="--shiki-dark:#D8DEE9;--shiki-light:#2E3440">console</span>
```

이 경우 생성된 HTML은 기본적으로 스타일이 없으며, 색상을 제어하기 위해서는 CSS를 추가해야 합니다.

CSS 변수에서 테마를 제어하는 것도 가능합니다. 더 자세한 내용은 [@mayank99](https://github.com/mayank99)이 이슈 [#6](https://github.com/antfu/shikiji/issues/6)에서 공유한 연구 및 예제를 참조하세요.
