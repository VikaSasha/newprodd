/* «Новые продукты» — общие компоненты и интерактив */
(function () {
  'use strict';

  var body = document.body;
  var page = body.getAttribute('data-page') || '';

  var ICONS = {
    star: '<svg viewBox="0 0 185 178" aria-hidden="true"><defs><linearGradient id="npGold" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#F4CF8E"/><stop offset=".45" stop-color="#E3A04A"/><stop offset="1" stop-color="#B8792F"/></linearGradient></defs><polygon points="92,0 149,178 92,138 57,93" fill="url(#npGold)"/><polygon points="0,66 185,66 35,178" fill="#fff"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    vk: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="6" fill="currentColor"/><path d="M12.8 17.2c-5 0-7.9-3.5-8-9.2h2.5c.1 4.2 1.9 6 3.4 6.4V8h2.4v3.6c1.4-.2 2.9-1.8 3.4-3.6h2.3c-.4 2.2-2 3.8-3.2 4.5 1.2.6 3 2 3.7 4.7h-2.5c-.6-1.8-2-3.2-3.7-3.4v3.4h-.3z" fill="var(--icon-bg, #287D53)"/></svg>',
    tg: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="currentColor"/><path d="M5.4 11.7l11.3-4.4c.5-.2 1 .1.8.9l-1.9 9c-.1.6-.5.8-1 .5l-2.9-2.1-1.4 1.3c-.2.2-.3.3-.6.3l.2-2.9 5.3-4.8c.2-.2 0-.3-.3-.1l-6.6 4.1-2.8-.9c-.6-.2-.6-.6.1-.9z" fill="var(--icon-bg, #287D53)"/></svg>',
    arrowL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    arrowR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chevL: '<svg viewBox="0 0 18 40" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M16 1 2 20l14 19"/></svg>',
    chevR: '<svg viewBox="0 0 18 40" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 1l14 19L2 39"/></svg>'
  };

  var NAV = [
    ['about', 'about.html', 'О нас'],
    ['products', 'products.html', 'Продукция'],
    ['suppliers', 'suppliers.html', 'Поставщикам'],
    ['news', 'news.html', 'Новости'],
    ['contacts', 'contacts.html', 'Контакты']
  ];
  var CONTACTS = {
    phones: ['+7 (904) 305-42-75', '+7 (951) 240-92-52', '+7 (951) 781-62-08'],
    email: 'info@newprod.ru',
    address: '454047, г. Челябинск, ул. Лазурная, д. 8',
    vk: 'https://vk.com/',
    tg: 'https://t.me/'
  };
  function tel(p) { return 'tel:' + p.replace(/[^\d+]/g, ''); }

  function logo(extraClass) {
    return '<a class="logo ' + (extraClass || '') + '" href="index.html" aria-label="Новые продукты — на главную">' + ICONS.star +
      '<span class="logo__text">Новые<br>продукты</span></a>';
  }
  function socials(cls) {
    return '<div class="socials ' + (cls || '') + '"><a href="' + CONTACTS.vk + '" target="_blank" rel="noopener" aria-label="ВКонтакте">' + ICONS.vk +
      '</a><a href="' + CONTACTS.tg + '" target="_blank" rel="noopener" aria-label="Telegram">' + ICONS.tg + '</a></div>';
  }

  /* ---------- шапка ---------- */
  var headerSlot = document.getElementById('site-header');
  if (headerSlot) {
    var over = body.getAttribute('data-header') === 'over';
    var links = NAV.map(function (n) {
      return '<a href="' + n[1] + '"' + (n[0] === page ? ' class="is-active" aria-current="page"' : '') + '>' + n[2] + '</a>';
    }).join('');
    headerSlot.outerHTML =
      '<header class="header' + (over ? ' header--over' : '') + '"><div class="container header__inner">' + logo() +
      '<nav class="nav" aria-label="Основное меню">' + links + '</nav>' +
      '<button class="burger" type="button" aria-label="Открыть меню" aria-expanded="false"><span></span></button></div></header>' +
      '<div class="mobile-menu" aria-hidden="true"><nav aria-label="Мобильное меню"><a href="index.html">Главная</a>' + links + '</nav>' +
      '<div class="mobile-menu__contacts">' + CONTACTS.phones.map(function (p) { return '<a href="' + tel(p) + '">' + p + '</a>'; }).join('') +
      '<a href="mailto:' + CONTACTS.email + '">' + CONTACTS.email + '</a><span>' + CONTACTS.address + '</span>' + socials() + '</div></div>';
  }

  /* ---------- подвал ---------- */
  var footerSlot = document.getElementById('site-footer');
  if (footerSlot) {
    footerSlot.outerHTML =
      '<footer class="footer"><div class="container footer__inner">' +
      '<div class="footer__brand">' + logo() +
      '<a class="footer__small" href="#" data-policy>Политика обработки персональных данных</a>' +
      '<p class="footer__copy">©2025 ООО Новые продукты. Все права защищены</p></div>' +
      '<nav class="footer__nav" aria-label="Меню в подвале"><a href="about.html">О нас</a><a href="products.html">Каталог</a>' +
      '<a href="suppliers.html">Поставщикам</a><a href="news.html">Новости</a><a href="contacts.html">Контакты</a></nav>' +
      '<div class="footer__contacts">' +
      '<div class="ic-row">' + ICONS.phone + '<div>' + CONTACTS.phones.map(function (p) { return '<a href="' + tel(p) + '">' + p + '</a>'; }).join(',<br>') + '</div></div>' +
      '<div class="ic-row">' + ICONS.mail + '<a href="mailto:' + CONTACTS.email + '">' + CONTACTS.email + '</a></div>' +
      '<div class="ic-row">' + ICONS.pin + '<span>' + CONTACTS.address + '</span></div></div>' +
      socials() + '</div></footer>';
  }

  /* ---------- мобильное меню ---------- */
  var burger = document.querySelector('.burger');
  var mmenu = document.querySelector('.mobile-menu');
  if (burger && mmenu) {
    burger.addEventListener('click', function () {
      var open = !body.classList.contains('menu-open');
      body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      mmenu.setAttribute('aria-hidden', String(!open));
    });
    mmenu.addEventListener('click', function (e) { if (e.target.closest('a')) body.classList.remove('menu-open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') body.classList.remove('menu-open'); });
  }

  /* ---------- иконки в разметке страниц ---------- */
  document.querySelectorAll('[data-icon]').forEach(function (el) { el.innerHTML = ICONS[el.getAttribute('data-icon')] || ''; });
  document.querySelectorAll('[data-socials]').forEach(function (el) { el.outerHTML = socials(el.getAttribute('data-socials')); });

  /* ---------- горизонтальные слайдеры ---------- */
  document.querySelectorAll('[data-slider]').forEach(function (root) {
    var track = root.querySelector('[data-track]');
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    if (!track) return;
    function step() {
      var item = track.children[0];
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return item ? item.getBoundingClientRect().width + gap : track.clientWidth;
    }
    function update() {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.classList.toggle('arrow-btn--fill', track.scrollLeft > 2);
      if (next) next.classList.toggle('arrow-btn--fill', track.scrollLeft < max);
    }
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  /* ---------- лайтбокс дипломов ---------- */
  var certs = document.querySelectorAll('.cert img');
  if (certs.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-label', 'Просмотр диплома');
    lb.innerHTML = '<img alt="">';
    body.appendChild(lb);
    certs.forEach(function (img) {
      img.parentElement.addEventListener('click', function () {
        lb.querySelector('img').src = img.src;
        lb.querySelector('img').alt = img.alt;
        lb.classList.add('is-open');
      });
    });
    lb.addEventListener('click', function () { lb.classList.remove('is-open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('is-open'); });
  }

  /* ---------- формы ---------- */
  document.querySelectorAll('form[data-feedback]').forEach(function (form) {
    var msg = form.querySelector('.form__msg');
    var phone = form.querySelector('[name="phone"]');
    if (phone) {
      phone.addEventListener('input', function () {
        var d = phone.value.replace(/\D/g, '');
        if (!d) { phone.value = ''; return; }
        if (d[0] === '8') d = '7' + d.slice(1);
        if (d[0] !== '7') d = '7' + d;
        d = d.slice(0, 11);
        var out = '+7';
        if (d.length > 1) out += ' (' + d.slice(1, 4);
        if (d.length >= 4) out += ') ' + d.slice(4, 7);
        if (d.length >= 7) out += '-' + d.slice(7, 9);
        if (d.length >= 9) out += '-' + d.slice(9, 11);
        phone.value = out;
      });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        var bad = f.type === 'checkbox' ? !f.checked :
          f.type === 'email' ? !/^\S+@\S+\.\S+$/.test(f.value.trim()) :
          f.name === 'phone' ? f.value.replace(/\D/g, '').length < 11 : !f.value.trim();
        var target = f.type === 'checkbox' ? f.closest('.consent') : f;
        target.classList.toggle('is-invalid', bad);
        if (bad) ok = false;
      });
      if (!ok) {
        if (msg) { msg.style.color = '#D9534F'; msg.textContent = 'Пожалуйста, заполните отмеченные поля и дайте согласие на обработку данных.'; }
        return;
      }
      if (msg) { msg.style.color = ''; msg.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.'; }
      form.reset();
    });
    form.addEventListener('input', function (e) {
      var t = e.target.type === 'checkbox' ? e.target.closest('.consent') : e.target;
      if (t) t.classList.remove('is-invalid');
    });
  });

  document.querySelectorAll('[data-policy]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); alert('Политика обработки персональных данных будет опубликована здесь.'); });
  });

  /* ---------- карточка товара ---------- */
  var PRODUCTS = {
    chicken: { name: 'Суп-пюре гороховый с курицей', img: 'assets/img/product-chicken.jpg', full: true },
    mushroom: { name: 'Суп-пюре гороховый с грибами', img: 'assets/img/soup-mushroom.jpg' },
    beef: { name: 'Суп-пюре гороховый с говядиной', img: 'assets/img/soup-beef.jpg' },
    ribs: { name: 'Суп-пюре чечевичный с копчёными рёбрышками', img: 'assets/img/soup-ribs.jpg' },
    veggie: { name: 'Суп-пюре гороховый с овощами', img: 'assets/img/soup-veggie.jpg' }
  };
  var productRoot = document.querySelector('[data-product]');
  if (productRoot) {
    var id = location.hash.replace('#', '') || new URLSearchParams(location.search).get('id');
    var p = PRODUCTS[id] || PRODUCTS.chicken;
    if (!PRODUCTS[id]) id = 'chicken';
    document.title = p.name + ' — Новые продукты';
    productRoot.querySelectorAll('[data-product-name]').forEach(function (el) { el.textContent = p.name; });
    productRoot.querySelectorAll('[data-product-img]').forEach(function (img) {
      img.src = p.img;
      img.alt = p.name;
      img.classList.toggle('is-cover', !!p.full);
    });
    productRoot.querySelectorAll('[data-only]').forEach(function (el) {
      el.hidden = el.getAttribute('data-only') !== (id === 'chicken' ? 'chicken' : 'other');
    });
  }

  /* вкладки */
  document.querySelectorAll('[data-tabs]').forEach(function (root) {
    var btns = root.querySelectorAll('[role="tab"]');
    var panels = root.querySelectorAll('[role="tabpanel"]');
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () {
        btns.forEach(function (x, j) {
          x.classList.toggle('is-active', i === j);
          x.setAttribute('aria-selected', String(i === j));
          panels[j].classList.toggle('is-active', i === j);
        });
      });
    });
  });

  /* галерея */
  document.querySelectorAll('[data-gallery]').forEach(function (root) {
    var imgs = root.querySelectorAll('.gallery__view img');
    var dots = root.querySelectorAll('.gallery__dots button');
    var cur = 0;
    function go(n) {
      cur = (n + imgs.length) % imgs.length;
      imgs.forEach(function (im, i) { im.classList.toggle('is-active', i === cur); });
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === cur); });
    }
    root.querySelector('.gallery__arrow--prev').addEventListener('click', function () { go(cur - 1); });
    root.querySelector('.gallery__arrow--next').addEventListener('click', function () { go(cur + 1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
  });

  /* ---------- появление блоков при прокрутке ---------- */
  /* блоки ниже первого экрана слегка «подъезжают», но всегда остаются видимыми */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.remove('reveal--pending'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.01 });
    revealEls.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('reveal--pending'); io.observe(el); }
    });
  }
  window.addEventListener('hashchange', function () { if (productRoot) location.reload(); });
})();
