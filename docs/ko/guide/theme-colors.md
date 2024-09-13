# 테마 색상 조작

## 임의 색상 값

일반적으로 TextMate 테마는 각 토큰의 색상 값을 유효한 16진수 색상 값으로 기대합니다. 이 제한은 [`vscode-textmate`](https://github.com/microsoft/vscode-textmate)에서 상속되었습니다. 그러나 Shiki v0.9.15부터 비-16진수 색상 값을 플레이스홀더로 대체한 후 토큰화 과정에서 다시 복원하는 자동 해결책이 도입되었습니다. 이를 통해 렌더링에 임의의 색상 값을 사용하는 테마를 기술적 세부 사항에 구애받지 않고 사용할 수 있습니다.

```ts twoslash
import { createHighlighter } from 'shiki'

const highlighter = await createHighlighter({
  langs: ['javascript'],
  themes: [
    {
      name: 'my-theme',
      settings: [
        {
          scope: ['comment'],
          settings: {
            // `rgb`, `hsl`, `hsla`, 혹은 지원되는 값 사용 가능
            foreground: 'rgb(128, 128, 128)' // [!code hl:3]
          }
        },
        {
          scope: ['string'],
          settings: {
            foreground: 'var(--code-string)' // CSS 변수 // [!code hl:1]
          }
        },
        // ... 추가 설정
      ],
      // 배경 및 전경 색상 // [!code hl:3]
      bg: 'var(--code-bg)',
      fg: 'var(--code-fg)'
    }
  ]
})

const html = highlighter.codeToHtml('const foo = "bar"', { lang: 'javascript', theme: 'my-theme' })
```

::: info 참고
이 기능을 신중히 사용하세요. 이는 TextMate 테마와의 호환성을 저해할 수 있습니다.

이 기능은 [`shiki-cli`](/packages/cli)나 [`shiki-monaco`](/packages/monaco)와 같은 웹 이외의 사용 환경에서 테마를 호환되지 않게 만들 수 있습니다.
:::

자세한 내용은 [테마 로드](./load-theme)를 참조하세요.

## 색상 대체

`colorReplacements` 옵션을 사용하여 테마의 색상 값을 대체할 수도 있습니다. 이는 테마의 색상 팔레트를 변경하고 싶을 때 유용합니다. 이 옵션은 테마 객체와 `codeToHast` 또는 `codeToHtml` 옵션에서 모두 제공할 수 있습니다.

`colorReplacements` 객체는 색상 대체 형식이어야 하며, 키는 대체할 색상, 값은 새로운 색상을 나타냅니다.

```js
const html = await codeToHtml(
  code,
  {
    lang: 'js',
    theme: 'min-dark',
    colorReplacements: {
      '#ff79c6': '#189eff'
    }
  }
)
```

또한 `colorReplacements`는 스코프가 있는 대체 색상을 포함할 수 있습니다. 이는 여러 테마를 제공하고 특정 테마의 색상을 변경하고 싶을 때 유용합니다.

```js
const html = await codeToHtml(
  code,
  {
    lang: 'js',
    themes: { dark: 'min-dark', light: 'min-light' },
    colorReplacements: {
      'min-dark': {
        '#ff79c6': '#189eff'
      },
      'min-light': {
        '#ff79c6': '#defdef'
      }
    }
  }
)
```

이는 `colorReplacements` 옵션에서만 허용되며, 테마 객체에서는 허용되지 않습니다.

## CSS 변수 테마

::: warning 실험적 기능
이 기능은 실험적이며, 버전 관리를 따르지 않고 변경될 수 있습니다.
:::

Shiki는 CSS 변수를 사용하는 테마를 더 쉽게 생성할 수 있도록 `createCssVariablesTheme` 팩토리 함수 도우미를 제공합니다. 이 테마는 다른 대부분의 테마보다 세밀하지 않으며, 앱에서 CSS 변수를 정의해야 합니다. 이는 Shiki의 [`css-variables theme`](https://github.com/shikijs/shiki/blob/main/docs/themes.md#theming-with-css-variables)에서 더 쉽게 마이그레이션할 수 있도록 제공됩니다. 더 나은 하이라이트 결과를 얻으려면 [임의 색상 값](#arbitrary-color-values)을 사용하여 테마를 수동으로 구성하거나 [색상 대체](#color-replacements)를 사용하여 기존 테마를 덮어쓰는 것이 좋습니다.

이 테마는 **기본적으로 포함되지 않으며**, 명시적으로 등록해야 합니다.

```ts twoslash
import { createCssVariablesTheme } from 'shiki/core'
import { createHighlighter } from 'shiki'

// 사용자 정의 CSS 변수 테마 생성, 아래는 기본값 예시
const myTheme = createCssVariablesTheme({ // [!code hl:6]
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true
})

const highlighter = await createHighlighter({
  langs: ['javascript'],
  themes: [myTheme] // 테마 등록 // [!code hl]
})

const html = highlighter.codeToHtml('const foo = "bar"', {
  lang: 'javascript',
  theme: 'css-variables' // 테마 사용 // [!code hl]
})
```

CSS 변수 예시:

```css
:root {
  --shiki-foreground: #eeeeee;
  --shiki-background: #333333;
  --shiki-token-constant: #660000;
  --shiki-token-string: #770000;
  --shiki-token-comment: #880000;
  --shiki-token-keyword: #990000;
  --shiki-token-parameter: #aa0000;
  --shiki-token-function: #bb0000;
  --shiki-token-string-expression: #cc0000;
  --shiki-token-punctuation: #dd0000;
  --shiki-token-link: #ee0000;

  /* lang: 'ansi' 사용 시 필요 */
  --shiki-ansi-black: #000000;
  --shiki-ansi-black-dim: #00000080;
  --shiki-ansi-red: #bb0000;
  --shiki-ansi-red-dim: #bb000080;
  --shiki-ansi-green: #00bb00;
  --shiki-ansi-green-dim: #00bb0080;
  --shiki-ansi-yellow: #bbbb00;
  --shiki-ansi-yellow-dim: #bbbb0080;
  --shiki-ansi-blue: #0000bb;
  --shiki-ansi-blue-dim: #0000bb80;
  --shiki-ansi-magenta: #ff00ff;
  --shiki-ansi-magenta-dim: #ff00ff80;
  --shiki-ansi-cyan: #00bbbb;
  --shiki-ansi-cyan-dim: #00bbbb80;
  --shiki-ansi-white: #eeeeee;
  --shiki-ansi-white-dim: #eeeeee80;
  --shiki-ansi-bright-black: #555555;
  --shiki-ansi-bright-black-dim: #55555580;
  --shiki-ansi-bright-red: #ff5555;
  --shiki-ansi-bright-red-dim: #ff555580;
  --shiki-ansi-bright-green: #00ff00;
  --shiki-ansi-bright-green-dim: #00ff0080;
  --shiki-ansi-bright-yellow: #ffff55;
  --shiki-ansi-bright-yellow-dim: #ffff5580;
  --shiki-ansi-bright-blue: #5555ff;
  --shiki-ansi-bright-blue-dim: #5555ff80;
  --shiki-ansi-bright-magenta: #ff55ff;
  --shiki-ansi-bright-magenta-dim: #ff55ff80;
  --shiki-ansi-bright-cyan: #55ffff;
  --shiki-ansi-bright-cyan-dim: #55ffff80;
  --shiki-ansi-bright-white: #ffffff;
  --shiki-ansi-bright-white-dim: #ffffff80;
}
```

Shiki에서 마이그레이션할 경우, 일부 변수가 Shiki의 `css-variables`에서 다음과 같이 이름이 변경되었습니다:

| Shiki                      | Shiki                |
| -------------------------- | -------------------- |
| `--shiki-color-text`       | `--shiki-foreground` |
| `--shiki-color-background` | `--shiki-background` |
| `--shiki-color-ansi-*`     | `--shiki-ansi-*`     |
