(function () {
  var discovery = document.querySelector('.post-discovery');
  var search = document.getElementById('post-search');
  var category = document.getElementById('category-filter');
  var status = document.getElementById('post-result-status');
  var empty = document.getElementById('post-empty');
  var more = document.getElementById('load-more');
  var posts = Array.prototype.slice.call(document.querySelectorAll('.post-item'));
  if (!discovery || !search || !category || !status || !empty || !more || !posts.length) return;

  var PAGE_SIZE = 10;
  var visibleLimit = PAGE_SIZE;

  function normalize(value) {
    return value.toLocaleLowerCase('ko-KR').replace(/\s+/g, ' ').trim();
  }

  function matchedPosts() {
    var query = normalize(search.value);
    var selectedCategory = category.value;

    return posts.filter(function (post) {
      var haystack = normalize([
        post.dataset.title,
        post.dataset.description,
        post.dataset.tags
      ].join(' '));
      var matchesQuery = !query || haystack.indexOf(query) !== -1;
      var matchesCategory = !selectedCategory || post.dataset.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }

  function render(resetLimit) {
    if (resetLimit) visibleLimit = PAGE_SIZE;
    var matches = matchedPosts();
    var visibleMatches = matches.slice(0, visibleLimit);

    posts.forEach(function (post) { post.hidden = true; });
    visibleMatches.forEach(function (post) { post.hidden = false; });

    empty.hidden = matches.length !== 0;
    more.hidden = visibleMatches.length >= matches.length;
    status.textContent = matches.length + '개의 글 중 ' + visibleMatches.length + '개 표시';
  }

  search.addEventListener('input', function () { render(true); });
  category.addEventListener('change', function () { render(true); });
  more.addEventListener('click', function () {
    visibleLimit += PAGE_SIZE;
    render(false);
  });

  discovery.hidden = false;
  render(true);
})();
