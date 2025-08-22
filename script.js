const hamburgerBtn = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('#hamburger-nav');

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded','false');
      }
    }
  });
});
