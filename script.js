// Minimal JS: nav toggle, year, and mailto fallback for commissions
function toggleNav() {
  const list = document.querySelector('.nav-list');
  list.classList.toggle('show');
}

document.getElementById('year').textContent = new Date().getFullYear();

function submitCommission(form) {
  const data = new FormData(form);
  const name = encodeURIComponent(data.get('name'));
  const email = encodeURIComponent(data.get('email'));
  const type = encodeURIComponent(data.get('type'));
  const details = encodeURIComponent(data.get('details'));
  // Mailto fallback: replace with your business email
  const to = 'hello@wolfpastrystudio.com';
  const subject = encodeURIComponent(`[Commission] ${decodeURIComponent(type)} — ${decodeURIComponent(name)}`);
  const body = encodeURIComponent(`Name: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}\nType: ${decodeURIComponent(type)}\n\nDetails:\n${decodeURIComponent(details)}`);
  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
  document.getElementById('formStatus').textContent = 'Opening your email client...';
  window.location.href = mailto;
  return false;
}

let _emailModalPrevFocus = null;

function openEmailModal() {
  const modal = document.getElementById('emailModal');
  const input = document.getElementById('emailToCopy');
  _emailModalPrevFocus = document.activeElement;

  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');

  // Focus and select the email for quick Ctrl/Cmd+C
  setTimeout(() => {
    input.focus();
    input.select();
  }, 0);

  // Allow ESC to close
  document.addEventListener('keydown', _emailEscListener);
}

function closeEmailModal() {
  const modal = document.getElementById('emailModal');
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');

  document.removeEventListener('keydown', _emailEscListener);
  if (_emailModalPrevFocus && typeof _emailModalPrevFocus.focus === 'function') {
    _emailModalPrevFocus.focus();
  }
}

function _emailEscListener(e) {
  if (e.key === 'Escape') closeEmailModal();
}

async function copyEmailFromModal() {
  const email = document.getElementById('emailToCopy').value;
  const status = document.getElementById('copyStatus');

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
    } else {
      // Fallback for older browsers
      const input = document.getElementById('emailToCopy');
      input.focus();
      input.select();
      document.execCommand('copy');
    }
    status.textContent = 'Copied!';
  } catch (err) {
    status.textContent = 'Could not copy. Please press Ctrl/Cmd+C.';
  }

  // Clear status message after a moment
  setTimeout(() => { status.textContent = ''; }, 1500);
}
