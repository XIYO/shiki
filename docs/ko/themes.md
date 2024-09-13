# 테마들

## 번들된 테마들

아래 나열된 테마는 [`tm-themes`](https://github.com/shikijs/textmate-grammars-themes/tree/main/packages/tm-themes)를 통해 `shiki` 패키지에 재배포됩니다.

<ThemesList />

테마는 각각의 저장소에서 허용된 라이선스(apache-2.0, mit 등)에 따라 제공되며, [이 NOTICE](https://github.com/shikijs/textmate-grammars-themes/blob/main/packages/tm-themes/NOTICE)에서 확인할 수 있습니다.

사용자 정의 테마를 로드하려면 [이 가이드](/guide/load-theme)를 참고하세요.

## 특수 테마들

하이라이팅을 생략하려면 테마를 `none`으로 설정할 수 있습니다. 이는 사용자가 지정한 테마 이름이 사용할 수 없을 때 기본값으로 유용합니다. 예를 들어:

```ts twoslash theme:none
import { codeToHtml } from 'shiki'

const html = codeToHtml('console.log("Hello World")', {
  lang: 'javascript',
  theme: 'none', // [!code hl]
})
```
