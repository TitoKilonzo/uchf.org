document.addEventListener('DOMContentLoaded', function () {

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('nav.primary');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.classList.toggle('open');
      nav.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Active nav link */
  var here = (document.body.getAttribute('data-page') || '').trim();
  document.querySelectorAll('nav.primary a[data-nav]').forEach(function (a) {
    if (a.getAttribute('data-nav') === here) a.classList.add('active');
  });

  /* Accordion */
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var q = item.querySelector('.accordion-q');
    var a = item.querySelector('.accordion-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.accordion-item').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.accordion-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 20 + 'px';
      }
    });
  });

  /* Tabs (donate page) — open the right tab if linked via hash */
  if (location.hash === '#tab-bank') {
    var bankBtn = document.querySelector('.tab-btn[data-tab="tab-bank"]');
    if (bankBtn) bankBtn.click();
  }
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = btn.closest('.tabs').parentElement;
      group.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
      group.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      group.querySelector('#' + btn.getAttribute('data-tab')).classList.add('active');
    });
  });

  /* Story filter (stories page) */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var storyCards = document.querySelectorAll('[data-year]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var year = btn.getAttribute('data-filter');
      storyCards.forEach(function (card) {
        card.style.display = (year === 'all' || card.getAttribute('data-year') === year) ? '' : 'none';
      });
    });
  });

  /* Lightbox */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    document.querySelectorAll('[data-lightbox]').forEach(function (el) {
      el.addEventListener('click', function () {
        lbImg.src = el.getAttribute('data-lightbox');
        lbImg.alt = el.getAttribute('data-caption') || '';
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('open');
        lbImg.src = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { lightbox.classList.remove('open'); lbImg.src = ''; }
    });
  }

  /* Toast */
  function toast(msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  /* Copy to clipboard */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var val = btn.getAttribute('data-copy');
      var restore = btn.textContent;
      function done() {
        btn.textContent = 'Copied';
        btn.classList.add('copied');
        toast('Copied "' + val + '" to clipboard');
        setTimeout(function () { btn.textContent = restore; btn.classList.remove('copied'); }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(done).catch(function () {
          fallbackCopy(val); done();
        });
      } else {
        fallbackCopy(val); done();
      }
    });
  });
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* Contact form -> mailto handoff */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var reason = form.reason ? form.reason.value : '';
      var message = form.message.value.trim();
      if (!name || !email || !message) {
        toast('Please fill in your name, email and message.');
        return;
      }
      var subject = encodeURIComponent('Message from ' + name + (reason ? ' — ' + reason : ''));
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:ukasicompassionate@yahoo.com?subject=' + subject + '&body=' + body;
      toast('Opening your email app to send this to UCHF…');
    });
  }

  /* WhatsApp toggle widget */
  var waWidget = document.getElementById('wa-widget');
  var waToggle = document.getElementById('wa-toggle');
  if (waWidget && waToggle) {
    waToggle.addEventListener('click', function () {
      var isOpen = waWidget.classList.toggle('open');
      waToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (waWidget.classList.contains('open') && !waWidget.contains(e.target)) {
        waWidget.classList.remove('open');
        waToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        waWidget.classList.remove('open');
        waToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Stat count-up on scroll into view */
  var stats = document.querySelectorAll('.stat .n[data-count]');
  if (stats.length && 'IntersectionObserver' in window) {
    var seen = new WeakSet();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          seen.add(entry.target);
          animateCount(entry.target);
        }
      });
    }, { threshold: 0.4 });
    stats.forEach(function (s) { io.observe(s); });
  }
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var start = 0, duration = 900, startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var val = Math.floor(progress * (target - start) + start);
      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
});
