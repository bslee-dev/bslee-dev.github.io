/*
 * 긴 글을 읽을 수 있게 만드는 네 가지 보정.
 *  1) 표를 스크롤 컨테이너로 감싼다 — kramdown은 표를 감싸주지 않아서
 *     좁은 화면에서 본문 밖으로 넘친다.
 *  2) 현재 읽은 위치를 화면 위의 진행 막대로 표시한다.
 *  3) 긴 글에서 맨 위로 돌아가는 버튼을 제공한다.
 *  4) h2가 충분히 많은 글에 목차를 붙인다.
 * 모두 마크다운 원문은 건드리지 않는다.
 */
(function () {
  var content = document.querySelector('.post-content');
  if (!content) return;

  /* --- 1. 표 가로 스크롤 --- */
  Array.prototype.forEach.call(content.querySelectorAll('table'), function (table) {
    if (table.parentNode.classList.contains('table-scroll')) return;
    var box = document.createElement('div');
    box.className = 'table-scroll';
    table.parentNode.insertBefore(box, table);
    box.appendChild(table);
  });

  /* --- 2. 읽기 진행률 + 맨 위로 --- */
  var progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-label', '글 읽기 진행률');
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', '100');
  var progressBar = document.createElement('span');
  progress.appendChild(progressBar);
  document.body.appendChild(progress);

  var topButton = document.createElement('button');
  topButton.className = 'back-to-top';
  topButton.type = 'button';
  topButton.setAttribute('aria-label', '맨 위로');
  topButton.textContent = '↑';
  document.body.appendChild(topButton);

  function updateReadingTools() {
    var contentTop = content.getBoundingClientRect().top + window.scrollY;
    var contentEnd = contentTop + content.offsetHeight - window.innerHeight;
    var percent = contentEnd <= contentTop
      ? 100
      : Math.max(0, Math.min(100, ((window.scrollY - contentTop) / (contentEnd - contentTop)) * 100));
    progressBar.style.width = percent + '%';
    progress.setAttribute('aria-valuenow', Math.round(percent));
    topButton.classList.toggle('is-visible', window.scrollY > 700);
  }

  topButton.addEventListener('click', function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  window.addEventListener('scroll', updateReadingTools, { passive: true });
  window.addEventListener('resize', updateReadingTools);
  updateReadingTools();

  /* --- 4. 목차 --- */
  var MIN_HEADINGS = 8;
  var headings = Array.prototype.slice.call(content.querySelectorAll('h2'));
  if (headings.length < MIN_HEADINGS) return;

  // kramdown이 한글 제목에도 id를 붙여주지만(#먼저-보는-아틀리에의-30년),
  // 붙지 않거나 section / section-1 같은 무의미한 id가 나온 경우에만 직접 만든다.
  var used = {};
  function slugify(text) {
    var base = text
      .trim()
      .toLowerCase()
      .replace(/[\s ]+/g, '-')
      .replace(/[^0-9a-z가-힣ㄱ-ㆎ-]/g, '')
      .replace(/-{2,}/g, '-')
      .replace(/^-|-$/g, '');
    if (!base) base = 'section';
    var slug = base;
    var n = 2;
    while (used[slug]) { slug = base + '-' + n++; }
    used[slug] = true;
    return slug;
  }

  var toc = document.createElement('details');
  toc.className = 'post-toc';
  toc.open = window.innerWidth > 720;

  var summary = document.createElement('summary');
  summary.innerHTML = '목차 <span class="count">' + headings.length + '</span>';
  toc.appendChild(summary);

  var list = document.createElement('ol');
  headings.forEach(function (h) {
    var text = h.textContent.trim();
    if (!h.id || /^section(-\d+)?$/.test(h.id)) {
      h.id = slugify(text);
    } else {
      used[h.id] = true;
    }
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = text;
    li.appendChild(a);
    list.appendChild(li);
  });
  toc.appendChild(list);

  content.insertBefore(toc, content.firstChild);
})();
