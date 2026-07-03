// Scroll reveal
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

// Sticky nav shadow + scroll-spy
(function () {
  var nav = document.querySelector('nav.topnav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  var links = nav.querySelectorAll('.navlinks a[href^="#"]');
  if (!links.length) return;
  var sections = [];
  links.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (section) sections.push({ link: a, section: section });
  });
  if (!sections.length) return;

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var match = sections.find(function (s) { return s.section === entry.target; });
      if (!match) return;
      if (entry.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('active'); });
        match.link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(function (s) { spy.observe(s.section); });
})();

// Back to top button
(function () {
  var btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// Terminal typing effect in hero
(function () {
  var body = document.querySelector('.terminal-body');
  if (!body) return;
  var lines = JSON.parse(body.getAttribute('data-lines') || '[]');
  if (!lines.length) return;
  body.innerHTML = '';

  var lineIndex = 0, charIndex = 0;
  var speed = 22;

  function typeNext() {
    if (lineIndex >= lines.length) return;
    var current = lines[lineIndex];
    var el = body.querySelector('.line[data-active="1"]');
    if (!el) {
      el = document.createElement('p');
      el.className = 'line ' + (current.cls || 'out');
      el.setAttribute('data-active', '1');
      body.appendChild(el);
    }
    if (charIndex === 0 && current.cls === 'prompt') {
      el.textContent = '';
    }
    charIndex++;
    el.textContent = current.text.slice(0, charIndex);

    if (charIndex >= current.text.length) {
      el.removeAttribute('data-active');
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, current.pause || 220);
    } else {
      setTimeout(typeNext, speed);
    }
  }
  setTimeout(typeNext, 300);
})();
