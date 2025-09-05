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
  const to = 'hello@wolfpastryvt.com';
  const subject = encodeURIComponent(`[Commission] ${decodeURIComponent(type)} — ${decodeURIComponent(name)}`);
  const body = encodeURIComponent(`Name: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}\nType: ${decodeURIComponent(type)}\n\nDetails:\n${decodeURIComponent(details)}`);
  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
  document.getElementById('formStatus').textContent = 'Opening your email client...';
  window.location.href = mailto;
  return false;
}
