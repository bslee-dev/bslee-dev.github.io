---
title: Series
description: "게임과 서브컬처의 역사를 주제별로 이어 읽을 수 있게 묶은 기획 페이지."
permalink: /series/
---

개별 글을 주제별로 이어 읽을 수 있도록 묶은 기획 페이지입니다. 글이 쌓이면 이곳의 시리즈도 계속 확장합니다.

{% comment %}
  시리즈는 태그로 모은다. 새 시리즈를 만들 때는 아래 목록에
  [표시 이름, 모을 태그] 한 쌍을 추가하고 글에 그 태그를 붙이면 된다.
{% endcomment %}
{% assign series_defs = "1990년대 연애·육성 시뮬레이션|연애시뮬레이션,아이돌마스터의 역사|아이돌마스터,코에이 삼국지|삼국지,코에이 대항해시대|대항해시대,일본 PC의 시대|일본PC" | split: "," %}

{% for def in series_defs %}
  {% assign parts = def | split: "|" %}
  {% assign label = parts[0] %}
  {% assign tag = parts[1] %}
  {% assign series_posts = site.tags[tag] | sort: "date" %}
## {{ label }}

{% if series_posts.size > 0 %}{% for post in series_posts %}- [{{ post.title }}]({{ post.url | relative_url }}) <small>{{ post.date | date: "%Y-%m-%d" }}</small>
{% endfor %}{% else %}아직 등록된 글이 없습니다.
{% endif %}
{% endfor %}

---

시리즈는 카테고리와 달리 하나의 주제를 따라 글을 이어 읽기 위한 묶음입니다. 전체 분류는 [Categories]({{ '/categories/' | relative_url }}), 세부 키워드는 [Tags]({{ '/tags/' | relative_url }})에서 볼 수 있습니다.