# bslee-dev.github.io

Jekyll 기반 개인 블로그입니다. GitHub Pages에서 바로 빌드/배포됩니다.

## 로컬 실행

```bash
bundle install
bundle exec jekyll serve
```

`http://localhost:4000` 에서 확인할 수 있습니다.

## 새 글 작성

`_posts/YYYY-MM-DD-slug.md` 형식으로 파일을 추가하세요.

```yaml
---
title: "제목"
description: "홈 화면 카드와 검색 결과에 나오는 한두 문장"
category: 게임역사
tags: [태그1, 태그2]
date: 2026-08-29 12:00:00 +0900
---

본문은 ## 부터 시작합니다.
```

front matter의 다섯 항목과 본문 작성 규칙(문단 길이, 강조, 출처 표기, 고유명사 표기 등)은
[CLAUDE.md](CLAUDE.md)에 정리되어 있습니다. 새 글을 쓰기 전에 먼저 읽어주세요.

## 특징

- 미니멀한 디자인
- 다크 모드 지원 (시스템 설정 자동 감지 + 우측 상단 토글 버튼, 선택값은 localStorage에 저장)
