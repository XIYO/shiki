# 언어들

## 번들된 언어들

아래 나열된 언어 문법은 [`tm-grammars`](https://github.com/shikijs/textmate-grammars-themes/tree/main/packages/tm-grammars)를 통해 `shiki` 패키지에 재배포됩니다.

<LanguagesList />

문법은 각각의 저장소에서 허용된 라이선스(apache-2.0, mit 등)에 따라 제공되며, [이 NOTICE](https://github.com/shikijs/textmate-grammars-themes/blob/main/packages/tm-grammars/NOTICE)에서 확인할 수 있습니다.

사용자 정의 언어를 로드하려면 [이 가이드](/guide/load-lang)를 참고하세요.

## 특수 언어들

### 일반 텍스트

하이라이팅을 생략하려면 언어를 `text`로 설정할 수 있습니다. 이는 사용자가 지정한 언어가 사용할 수 없을 때 기본값으로 유용합니다. 예를 들어:

```txt
import { codeToHtml } from 'shiki'

const html = codeToHtml('console.log("Hello World")', {
  lang: 'text', // [!code hl]
  theme: 'vitesse-light',
})
```

`txt`, `plain`은 `text`의 별칭으로 제공됩니다.

### ANSI

터미널 출력을 하이라이팅하기 위해 특수 처리된 언어인 `ansi`가 제공됩니다. 예를 들어:

```ansi
[0;90m┌[0m  [0;36;1mWelcome to VitePress![0m[0m
[0;90m│[0m[0m
[0;32m◇[0m  Where should VitePress initialize the config?[0m
[0;90m│[0m  [0;2m./docs[0m[0m
[0;90m│[0m[0m
[0;32m◇[0m  Site title:[0m
[0;90m│[0m  [0;2mMy Awesome Project[0m[0m
[0;90m│[0m[0m
[0;32m◇[0m  Site description:[0m
[0;90m│[0m  [0;2mA VitePress Site[0m[0m
[0;90m│[0m[0m
[0;36m◆[0m  Theme:[0m
[0;36m│[0m  [0;32m●[0m Default Theme [0;2m(Out of the box, good-looking docs)[0m[0m
[0;36m│[0m  [0;2m○[0m [0;2mDefault Theme + Customization[0m[0m
[0;36m│[0m  [0;2m○[0m [0;2mCustom Theme[0m[0m
[0;36m└[0m
```

위 코드 스니펫의 [원본 마크다운을 확인하세요](https://github.com/shikijs/shiki/blob/main/docs/languages.md?plain=1#L35).
