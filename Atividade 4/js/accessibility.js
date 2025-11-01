export function initAccessibility() {
  // Toggle dark and high-contrast modes, persist in localStorage
  const body = document.body;
  const darkBtn = document.querySelectorAll('#toggle-dark');
  const hcBtn = document.querySelectorAll('#toggle-hc');

  // apply stored preference
  const stored = localStorage.getItem('ong_prefs');
  if (stored) {
    try {
      const prefs = JSON.parse(stored);
      if (prefs.dark) body.classList.add('dark-mode');
      if (prefs.hc) body.classList.add('high-contrast');
      // set aria-pressed on buttons if present
      document.querySelectorAll('#toggle-dark').forEach(b => b.setAttribute('aria-pressed', prefs.dark ? 'true' : 'false'));
      document.querySelectorAll('#toggle-hc').forEach(b => b.setAttribute('aria-pressed', prefs.hc ? 'true' : 'false'));
    } catch(e) { /* ignore */ }
  }

  // attach listeners
  document.querySelectorAll('#toggle-dark').forEach(btn => {
    btn.addEventListener('click', () => {
      const enabled = body.classList.toggle('dark-mode');
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      savePrefs();
    });
  });

  document.querySelectorAll('#toggle-hc').forEach(btn => {
    btn.addEventListener('click', () => {
      const enabled = body.classList.toggle('high-contrast');
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      savePrefs();
    });
  });

  // make hamburger label keyboard-activable (Enter/Space)
  document.querySelectorAll('.hamburger').forEach(label => {
    label.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const cb = document.getElementById('menu-toggle');
        if (cb) cb.checked = !cb.checked;
      }
    });
  });

  function savePrefs() {
    const prefs = { dark: body.classList.contains('dark-mode'), hc: body.classList.contains('high-contrast') };
    localStorage.setItem('ong_prefs', JSON.stringify(prefs));
  }
}