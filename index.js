const menuButton = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  };
  menuButton.addEventListener('click', () => {
    const opened = navLinks.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(opened));
    menuButton.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => {
    if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) closeMenu();
  });
}
document.querySelectorAll('#copyright-year').forEach(y => y.textContent = String(new Date().getFullYear()));
const config = window.PORTFOLIO_CONFIG || {};
const phoneField = document.getElementById('contact-phone');
if (phoneField && config.phone && config.phone.trim()) {
  const phone = config.phone.trim();
  phoneField.textContent = '';
  const phoneAnchor = document.createElement('a');
  phoneAnchor.href = 'tel:' + phone.replace(/[^+\d]/g, '');
  phoneAnchor.textContent = phone;
  phoneField.appendChild(phoneAnchor);
}
const form = document.getElementById('contact-form');
if (form) {
  const status = document.getElementById('form-status');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.namedItem('name').value.trim();
    const email = form.elements.namedItem('email').value.trim();
    const message = form.elements.namedItem('message').value.trim();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent('Portfolio inquiry from ' + name);
    const body = encodeURIComponent('From: ' + name + '\nReply-to: ' + email + '\n\n' + message);
    const to = config.email || 'atikurrahmankhan1610@gmail.com';
    status.textContent = 'Opening your email app. If nothing opens, email me directly using the address shown here.';
    window.location.href = 'mailto:' + encodeURIComponent(to) + '?subject=' + subject + '&body=' + body;
  });
}
