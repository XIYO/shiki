---
outline: deep
---

# 호환 빌드

깊은 마이그레이션을 더 쉽게 하기 위해, v0.x의 주요 변경 사항을 해결하는 호환 빌드를 제공합니다. 이를 `shiki`의 대체품으로 사용하여 단계별로 마이그레이션할 수 있습니다.

## 설치

<Badges name="@shikijs/compat" />

`package.json`에서 `shiki`에 대한 별칭을 설정하세요:

<!-- eslint-skip -->

```json
{
  "dependencies": {
    "shiki": "0.14.3", // [!code --]
    "shiki": "npm:@shikijs/compat@1.0" // [!code ++]
  }
}
```

[변경 사항 목록](/guide/migrate#migrate-from-v0-14)을 확인하여 수동으로 마이그레이션해야 할 부분이 있는지 확인하세요.
