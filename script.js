// Minimal JS: nav toggle, year, and mailto fallback for commissions
function toggleNav() {
  const list = document.querySelector('.nav-list');
  list.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

function submitCommission(form) {
  const data = new FormData(form);
  const name = encodeURIComponent(data.get('name'));
  const email = encodeURIComponent(data.get('email'));
  const type = encodeURIComponent(data.get('type'));
  const details = encodeURIComponent(data.get('details'));
  const to = 'hello@wolfpastrystudio.com'; // update if needed
  const subject = encodeURIComponent(`[Commission] ${decodeURIComponent(type)} — ${decodeURIComponent(name)}`);
  const body = encodeURIComponent(
    `Name: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}\nType: ${decodeURIComponent(type)}\n\nDetails:\n${decodeURIComponent(details)}`
  );
  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
  const statusEl = document.getElementById('formStatus');
  if (statusEl) statusEl.textContent = 'Opening your email client...';
  window.location.href = mailto;
  return false;
}

(function () {
  try {
    let path = location.pathname;
    if (!path.endsWith('/')) path = path.replace(/index\.html$/, '/');
    document.querySelectorAll('.nav-list a').forEach(a => {
      const href = a.getAttribute('href');
      if ((href === '/' && path === '/') || (href !== '/' && path.startsWith(href))) {
        a.classList.add('active');
      }
    });
  } catch (e) {}
})();

// Email modal logic
let _emailModalPrevFocus = null;
function openEmailModal() {
  const modal = document.getElementById('emailModal');
  const input = document.getElementById('emailToCopy');
  _emailModalPrevFocus = document.activeElement;
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  setTimeout(() => { try { input.focus(); input.select(); } catch(e){} }, 0);
  document.addEventListener('keydown', _emailEscListener);
}
function closeEmailModal() {
  const modal = document.getElementById('emailModal');
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  document.removeEventListener('keydown', _emailEscListener);
  if (_emailModalPrevFocus && typeof _emailModalPrevFocus.focus === 'function') _emailModalPrevFocus.focus();
}
function _emailEscListener(e) { if (e.key === 'Escape') closeEmailModal(); }
async function copyEmailFromModal() {
  const email = document.getElementById('emailToCopy').value;
  const status = document.getElementById('copyStatus');
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
    else { const input = document.getElementById('emailToCopy'); input.focus(); input.select(); document.execCommand('copy'); }
    if (status) status.textContent = 'Copied!';
  } catch(e) { if (status) status.textContent = 'Could not copy. Press Ctrl/Cmd+C.'; }
  setTimeout(() => { if (status) status.textContent = ''; }, 1500);
}

// Highlight current link in section sidebar (.section-nav)
(function () {
  const path = location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.section-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && path.startsWith(href)) a.classList.add('active');
  });
})();
