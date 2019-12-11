import { TweenMax } from 'gsap/TweenMax';

'use strict';

const heroTtl = document.querySelector('.hero_ttl');
const secTitles = document.querySelectorAll('.section_ttl');
const animEls = document.querySelectorAll('.fade_in_down');


/* -------------------------------
Hero Area Animation
-------------------------------- */
export const topMv = () => {
  TweenMax.fromTo(heroTtl, 0.35, {
    y: '-30px',
    opacity: 0,
    ease: Quint.easeInOutSine
  }, {
    y: 0,
    opacity: 1
    });
};


/* -------------------------------
Content Area Animation
-------------------------------- */
const scollMv = () => {
  const pos = window.scrollY;
  const winH = window.innerHeight;
  const timing = 150;

  secTitles.forEach((secTitle, i) => {
    const el = secTitle.offsetTop;
  
    // アニメーションは一度だけ
    if (secTitle.classList.contains('is-animated')) return;

    if (pos > el - winH + timing) {
      secTitle.classList.add('is-animated');
      let anim = TweenMax.fromTo(secTitle, 0.35, {
        y: '-24px',
        opacity: 0,
        ease: Quint.easeInOutSine
      }, {
        y: 0,
        opacity: 1,
      });
      anim.delay(0.1 * i);
    }
  });

  animEls.forEach((animEl, i) => {
    const el = animEl.offsetTop;
  
    // アニメーションは一度だけ
    if (animEl.classList.contains('is-animated')) return;
  
    if (pos > el - winH + timing) {
      animEl.classList.add('is-animated');
      let anim = TweenMax.fromTo(animEl, 0.35, {
        y: '-24px',
        opacity: 0,
        ease: Quint.easeInOutSine
      }, {
        y: 0,
        opacity: 1,
      });
      anim.delay(0.1 * i);
    }
  });
};


//DOMツリー解析後
window.addEventListener('DOMContentLoaded', () => {
  heroTtl.style.opacity = 0;
  animEls.forEach(animEl => animEl.style.opacity = 0);
  secTitles.forEach(secTitle => secTitle.style.opacity = 0);
});

//ページ内の全てのリソース読み込み完了後
window.addEventListener('load', () => {
  scollMv();
});

window.addEventListener('scroll', () => {
  scollMv();
});