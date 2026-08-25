---
title: Series
permalink: /series/
---

개별 글을 주제별로 이어 읽을 수 있도록 묶은 기획 페이지입니다. 글이 쌓이면 이곳의 시리즈도 계속 확장합니다.

## 1990년대 연애·육성 시뮬레이션

{% assign romance_posts = site.posts | where_exp: "post", "post.tags contains '연애시뮬레이션'" %}
{% for post in romance_posts %}
- [{{ post.title }}]({{ post.url | relative_url }}) <small>{{ post.date | date: "%Y-%m-%d" }}</small>
{% else %}
아직 등록된 글이 없습니다.
{% endfor %}

## 아이돌마스터의 역사

{% for post in site.posts %}
{% if post.title contains '아이돌마스터' %}
- [{{ post.title }}]({{ post.url | relative_url }}) <small>{{ post.date | date: "%Y-%m-%d" }}</small>
{% endif %}
{% endfor %}

## 코에이 삼국지

{% for post in site.posts %}
{% if post.title contains '삼국지' %}
- [{{ post.title }}]({{ post.url | relative_url }}) <small>{{ post.date | date: "%Y-%m-%d" }}</small>
{% endif %}
{% endfor %}

---

시리즈는 카테고리와 달리 하나의 주제를 따라 글을 이어 읽기 위한 묶음입니다. 전체 분류는 [Categories]({{ '/categories/' | relative_url }}), 세부 키워드는 [Tags]({{ '/tags/' | relative_url }})에서 볼 수 있습니다.
