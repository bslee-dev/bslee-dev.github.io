# bslee-dev.github.io

Jekyll 기반 개인 블로그입니다. GitHub Pages에서 바로 빌드/배포됩니다.

## 로컬 실행

```bash
bundle install
bundle exec jekyll serve
```

`http://localhost:4000` 에서 확인할 수 있습니다.

## 새 글 작성

`_posts/YYYY-MM-DD-title.md` 형식으로 파일을 추가하세요.

```yaml
---
title: "제목"
tags: [태그1, 태그2]
---

본문 내용
```

## 특징

- 미니멀한 디자인
- 다크 모드 지원 (시스템 설정 자동 감지 + 우측 상단 토글 버튼, 선택값은 localStorage에 저장)
