import { TweenMax } from 'gsap/TweenMax';
import { topMv } from './index';
// let $ = require('jquery');

import '../scss/main.scss';

('use strict');

const BODY = document.body;
const header = document.getElementById('header');
const headerH = header.clientHeight;
const loader = document.getElementById('loader');
const spinner = document.getElementById('loader_spinner');
const content = document.getElementById('wrapper');
const navBtn = document.getElementById('hamburger');
const navItems = document.querySelectorAll('.gnav_item, .gnav_sub li');
const winW = window.innerWidth || document.documentElement.clientWidth;
const anchors = document.querySelectorAll('a[href^="#"]');
const easing = Quint.easeInOutSine;
let isMobile = false;

//let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;

/* -------------------------------
window size
-------------------------------- */
const getWindowSize = () => {
  if (winW < 599) {
    isMobile = true;
  } else {
    isMobile = false;
  }
};

/* -------------------------------
loading
-------------------------------- */
const showContent = () => {
  setTimeout(() => spinner.classList.add('loaded'), 200);
  setTimeout(() => {
    loader.classList.add('loaded');
    content.style.display = 'block';
  }, 400);

  // top
  if (BODY.classList.contains('index')) setTimeout(() => topMv(), 800);
};

/* -------------------------------
header
-------------------------------- */
const onWindowScroll = () => {
  if (window.scrollY >= headerH) {
    if (header.classList.contains('header-onscroll')) return;
    header.classList.add('header-onscroll');
  } else {
    header.classList.remove('header-onscroll');
  }
};

/* -------------------------------
smooth scroll
-------------------------------- */
const moveTo = (el, e) => {
  e.preventDefault();
  e.stopImmediatePropagation();

  const targetId = el.getAttribute('href').slice(1);
  const target = document.getElementById(targetId);
  const pos = target.getBoundingClientRect().top;
  const scrollPos = window.pageYOffset;
  const move = pos + scrollPos;

  window.scroll({
    top: move - headerH,
    behavior: 'smooth'
  });
};

/* -------------------------------
navigation
-------------------------------- */
const toggleMenu = e => {
  e.preventDefault();
  e.stopPropagation();

  if (BODY.classList.contains('gnav_is-open')) {
    BODY.classList.remove('gnav_is-open');
    navBtn.classList.remove('hamburger_is-active');
    hideNav();
  } else {
    BODY.classList.add('gnav_is-open');
    navBtn.classList.add('hamburger_is-active');
    showNav();
  }
};
const hideNav = () =>
  navItems.forEach(navItem => {
    navItem.style.opacity = 0;
  });

const showNav = () => {
  navItems.forEach(navItem => {
    let showNavItem = TweenMax.fromTo(navItem, 0.35, {
        y: '24px',
        autoAlpha: 0,
        ease: easing
      },
      {
        y: 0,
        autoAlpha: 1
      }
    );
    setTimeout(() => {
      showNavItem;
    }, 200);
  });
};

navBtn.addEventListener('click', e => toggleMenu(e));


/* -------------------------------
load
-------------------------------- */
// DOMツリー解析後
window.addEventListener('DOMContentLoaded', () => {
  getWindowSize();
  if (isMobile) hideNav();
});

// ページ内の全てのリソース読み込み完了後
window.addEventListener('load', () => {
  showContent();
  onWindowScroll();
});

/* -------------------------------
resize
-------------------------------- */
window.addEventListener('resize', () => {
  navItems.forEach(navItem => {
    navItem.style.opacity = 1;
  });
});

window.addEventListener('scroll', () => {
  onWindowScroll();
});


/* -------------------------------
click
-------------------------------- */
anchors.forEach(anchor =>
  anchor.addEventListener('click', function(e) {
    moveTo(this, e);
  })
);

