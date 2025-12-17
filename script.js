// Minimal JS: nav toggle, year, and mailto fallback for commissions
function toggleNav() {
  const nav = document.getElementById('nav');
  const isOpen = nav.classList.toggle('open');
  const btn = nav.querySelector('.nav-toggle');
  if (btn) btn.setAttribute('aria-expanded', String(isOpen));
}

// Close the menu when clicking outside or pressing Esc (nice UX)
document.addEventListener('click', (e) => {
  const nav = document.getElementById('nav');
  if (!nav) return;
  if (nav.classList.contains('open') && !nav.contains(e.target)) {
    nav.classList.remove('open');
    const btn = nav.querySelector('.nav-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const nav = document.getElementById('nav');
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      const btn = nav.querySelector('.nav-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// --- Contact aliases (edit if you change addresses)
const CONTACT_ALIASES = {
  hello: 'hello@wolfpastrystudio.com',
  commissions: 'commissions@wolfpastrystudio.com',
  merch: 'merch@wolfpastrystudio.com'
};

// Build and launch a mailto link with a subject + body from a data object
function sendMail(to, subject, fieldsObj) {
  const lines = [];
  for (const [label, value] of Object.entries(fieldsObj)) {
    if (value != null && String(value).trim() !== '') {
      lines.push(`${label}: ${value}`);
    }
  }
  const body = lines.join('\n');
  const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}

function submitCommission(form) {
  const data = new FormData(form);
  const fields = {
    'Name': data.get('name'),
    'Email': data.get('email'),
    'Commission Type': data.get('type'),
    'Details / References': data.get('details')
  );
  const subject = `[Commission] ${data.get('type') || ''} — ${data.get('name') || ''}`;
  sendMail(CONTACT_ALIASES.commissions, subject, fields);
  const status = document.getElementById('formStatus');
  if (status) status.textContent = 'Opening your email app...';
  return false; // prevent page reload
}

function submitContact(form) {
  const data = new FormData(form);
  const reason = data.get('reason') || 'general';

  // choose the alias based on reason
  const to =
    reason === 'commission' ? CONTACT_ALIASES.commissions :
    reason === 'merch' ? CONTACT_ALIASES.merch :
    CONTACT_ALIASES.hello;

  const subject =
    reason === 'commission' ? `[Commission Inquiry] ${data.get('name') || ''}` :
    reason === 'merch' ? `[Merch Question] ${data.get('name') || ''}` :
    `[Inquiry] ${data.get('name') || ''}`;

  const fields = {
    'Name': data.get('name'),
    'Email': data.get('email'),
    'Reason': reason,
    'Message': data.get('message')
  };

  sendMail(to, subject, fields);
  const status = document.getElementById('contactStatus');
  if (status) status.textContent = 'Opening your email app...';
  return false;
}

function submitMerch(form) {
  const data = new FormData(form);
  const subject = `[Merch Interest] ${data.get('email') || ''}`;
  const fields = {
    'Email': data.get('email'),
    'Interest': data.get('interest')
  };
  sendMail(CONTACT_ALIASES.merch, subject, fields);
  const status = document.getElementById('merchStatus');
  if (status) status.textContent = 'Opening your email app...';
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
