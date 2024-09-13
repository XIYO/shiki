# 소개

<br>

<span text-brand-yellow text-xl>Shiki</span> <span op75>(式, ["스타일"](https://jisho.org/word/%E5%BC%8F)을 의미하는 일본어 단어)</span>는 TextMate 문법과 테마를 기반으로 한 아름답고 강력한 구문 강조 도구로, VS Code의 구문 강조와 동일한 엔진을 사용합니다. 거의 모든 주류 프로그래밍 언어에 대해 매우 정확하고 빠른 구문 강조를 제공합니다.

유지해야 할 사용자 정의 정규 표현식도, 사용자 정의 CSS도, 사용자 정의 HTML도 없습니다. 그리고 VS Code에서 좋아하는 언어와 테마가 발전하면, 구문 강조도 함께 발전합니다.

참고로, 이 사이트의 모든 코드 블록은 예상대로 Shiki로 강조 표시됩니다 \:)

## 기능

- 모든 문법/테마/wasm은 ESM으로 제공되며, 필요할 때 지연 로드되고 번들러 친화적입니다.
- 이식 가능하며 중립적입니다. Node.js API나 파일 시스템에 의존하지 않고, 모든 최신 자바스크립트 런타임에서 작동합니다.
- ESM 전용 ([CDN 사용법](/guide/install#cdn-usage), [CJS 사용법](/guide/install#cjs-usage)).
- [언어/테마를 선택적으로 번들링](/guide/install#fine-grained-bundle)합니다.
- [라이트/다크 테마 지원](/guide/dual-themes)
- [`hast` 지원](/guide/transformers#codetohast)
- [Transformers API](/guide/transformers)
- [데코레이션 API](/guide/decorations)
- [TypeScript Twoslash 통합](/packages/twoslash)
- [호환 빌드](/guide/compat)

## 플레이그라운드

Shiki가 코드를 어떻게 강조하는지 직접 체험해 볼 수 있는 작은 플레이그라운드입니다. 이 문서의 다른 코드 블록들은 빌드 시간에 렌더링되어 정적으로 제공되지만, 이 플레이그라운드는 브라우저에서 클라이언트 측으로 렌더링됩니다. 테마와 언어는 필요할 때 로드됩니다.

<ShikiMiniPlayground />

프로젝트에서 사용하려면 [Shiki 설치하기](/guide/install)를 참고하세요.

## 번들 크기

번들 크기는 [pkg-size.dev/shiki](https://pkg-size.dev/shiki)에서 자세히 확인할 수 있습니다.

`v1.1.6` 기준, 2024년 2월 22일 측정:

| 번들                | 크기 (최소화) | 크기 (gzip) | 비고                                                        |
| ------------------- | ------------: | ----------: | ----------------------------------------------------------- |
| `shiki`             |        6.9 MB |      1.3 MB | 모든 테마와 언어가 비동기 청크로 제공됩니다                 |
| `shiki/bundle/full` |        6.9 MB |      1.3 MB | `shiki`와 동일                                              |
| `shiki/bundle/web`  |        4.2 MB |      748 KB | 모든 테마와 일반적인 웹 언어가 비동기 청크로 제공됩니다     |
| `shiki/core`        |        106 KB |       34 KB | 테마나 언어가 포함되지 않은 코어 엔진, 원하는 방식으로 구성 |
| `shiki/wasm`        |        623 KB |      231 KB | base64 문자열로 인라인된 WASM 바이너리                      |
