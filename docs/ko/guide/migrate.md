# 마이그레이션

Shiki v1.0 릴리스는 주요 리팩토링으로, 과거에 내렸던 모든 설계 결정을 재검토한 버전입니다. 원래는 새로운 설계를 실험하기 위해 [Shikiji](https://github.com/antfu/shikiji)라는 별도의 패키지 이름을 사용했으나, 이제 Shiki v1.0으로 다시 통합되었습니다.

> [!TIP] 더 알아보기
> v1.0에 대한 이야기와 자세한 내용은 [블로그 게시물](https://nuxt.com/blog/shiki-v1)을 확인하세요.

## v0.14에서 마이그레이션

[`shiki@0.14.3`](https://github.com/shikijs/shiki/releases/tag/v0.14.3)에서 변경된 사항은 다음과 같습니다:

### 주요 변경 사항

수동으로 마이그레이션해야 하는 주요 변경 사항:

- CJS 및 IIFE 빌드가 제거되었습니다. 자세한 내용은 [CJS 사용법](/guide/install#cjs-usage) 및 [CDN 사용법](/guide/install#cdn-usage)을 참조하세요.
- `codeToHtml`은 내부적으로 [`hast`](https://github.com/syntax-tree/hast)를 사용합니다. 생성된 HTML은 조금 다르지만, 동일하게 작동해야 합니다.
- `css-variables` 테마는 더 이상 지원되지 않습니다. 대신 [듀얼 테마](/guide/dual-themes) 접근 방식을 사용하거나 [테마 색상 조작](/guide/theme-colors) 페이지를 참조하세요.

### 호환성 변경 사항

주 패키지 `shiki`에 적용된 변경 사항이지만, [호환성 빌드 `@shikijs/compat`](/guide/compat#compatibility-build)로 셔밍되었습니다:

- 최상위 네임드 내보내기 `setCDN`, `loadLanguage`, `loadTheme`, `setWasm`이 제거되었습니다. 더 이상 필요하지 않기 때문입니다.
- `BUNDLED_LANGUAGES`, `BUNDLED_THEMES`는 각각 `shiki/langs`와 `shiki/themes`로 이동했고, 이름이 `bundledLanguages`, `bundledThemes`로 변경되었습니다.
- `createHighlighter`의 `theme` 옵션이 제거되었으며, 이제 배열로 된 `themes` 옵션을 사용합니다.
- 하이라이터는 더 이상 기본 테마 컨텍스트를 유지하지 않습니다. `codeToHtml` 및 `codeToTokens`에 `theme` 옵션이 필요합니다.
- `codeToThemedTokens`는 `codeToTokensBase`로 이름이 변경되었고, 상위 레벨 `codeToTokens`가 추가되었습니다.
- `codeToTokens`는 기본적으로 `includeExplanation`을 `false`로 설정합니다.
- `.ansiToHtml`은 이제 `.codeToHtml`에 `ansi`라는 특수 언어로 병합되었습니다. `codeToHtml(code, { lang: 'ansi' })`를 사용하세요.
- `lineOptions`는 완전히 사용자 정의 가능한 `transforms` 옵션으로 대체되었습니다.
- `LanguageRegistration`의 `grammar` 필드는 `LanguageRegistration` 자체로 플래트닝되었습니다. 자세한 내용은 타입 정의를 참조하세요.

### 생태계 패키지

- `shiki-twoslash`는 완전히 새로 작성되었습니다. 이제는 Shiki 하이라이터의 래퍼가 아니며, Shiki 트랜스포머로 변환되어 Shiki 트랜스포머를 지원하는 모든 통합에 플러그인으로 사용할 수 있습니다. 패키지는 이제 [`@shikijs/twoslash`](/packages/twoslash)입니다.
- `shiki-twoslash`의 통합 패키지, 예를 들어 `gatsby-remark-shiki-twoslash` 등은 점차 일반 Shiki 버전으로 이전될 예정입니다. 그 전에 [`@shikijs/rehype`](/packages/rehype) 또는 [`@shikijs/markdown-it`](/packages/markdown-it)를 사용하여 이러한 메타 프레임워크에 Shiki를 통합할 수 있습니다.
- [`@shikijs/monaco`](/packages/monaco), [`@shikijs/cli`](/packages/cli), [`@shikijs/rehype`](/packages/rehype), [`@shikijs/markdown-it`](/packages/markdown-it)와 같은 새로운 공식 통합이 도입되었습니다.
- `shiki-renderer-path` 및 `shiki-renderer-svg` 패키지는 사용이 적어 폐기될 예정입니다. 필요하다면 사용 사례를 기재하여 이슈를 열어주세요. 다시 도입하는 것에 대해 열려 있습니다.
- `vuepress-plugin-shiki`는 [VuePress](https://github.com/vuejs/vuepress#status)가 더 이상 권장되지 않기 때문에 폐기되었습니다. 그 후속작인 [VitePress](https://vitepress.dev/)에는 Shiki 통합이 내장되어 있습니다.

## Shikiji에서 마이그레이션

이미 [Shikiji](https://github.com/antfu/shikiji)를 사용하고 있는 경우, 먼저 최신 마이너 버전 v0.10으로 업데이트하세요. 그런 다음 패키지 이름을 변경하는 간단한 작업으로 마이그레이션할 수 있습니다:

- `shikiji` -> `shiki`
- `shikiji-core` -> `@shikijs/core`
- `shikiji-twoslash` -> `@shikijs/twoslash`
- `shikiji-transformers` -> `@shikijs/transformers`
- `shikiji-monaco` -> `@shikijs/monaco`
- `shikiji-cli` -> `@shikijs/cli`
- `markdown-it-shikiji` -> `@shikijs/markdown-it`
- `rehype-shikiji` -> `@shikijs/rehype`
