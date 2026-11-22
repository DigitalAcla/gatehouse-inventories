/* Gatehouse: mobile navigation and lightweight horizontal carousels. */
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpening = menuToggle.getAttribute('aria-expanded') !== 'true';

    menuToggle.setAttribute('aria-expanded', String(isOpening));
    menuToggle.setAttribute(
      'aria-label',
      isOpening ? 'Close navigation' : 'Open navigation'
    );
    mainNav.classList.toggle('is-open', isOpening);
  });

  mainNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    }
  });
}

document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    const track = document.getElementById(button.dataset.target);
    if (!track) return;

    const slide = track.firstElementChild;
    const slideWidth = slide ? slide.getBoundingClientRect().width : 260;
    const gap = parseFloat(getComputedStyle(track).gap || '0');
    const direction = button.dataset.scroll === 'next' ? 1 : -1;

    track.scrollBy({
      left: direction * (slideWidth + gap),
      behavior: 'smooth'
    });
  });
});
