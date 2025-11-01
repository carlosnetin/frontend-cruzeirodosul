// SPA básico: usa fetch para trocar apenas <main.container>
export function initSPA() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const links = document.querySelectorAll('nav ul.menu a');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // se link externo, deixar normal
      if (!href || href.startsWith('http')) return;
      e.preventDefault();
      loadPage(href);
      window.history.pushState({page: href}, '', href);
      // close mobile menu if open
      const menuToggle = document.getElementById('menu-toggle');
      if (menuToggle) menuToggle.checked = false;
    });
  });

  window.addEventListener('popstate', (e) => {
    const page = (e.state && e.state.page) ? e.state.page : window.location.pathname.split('/').pop() || 'index.html';
    loadPage(page);
  });

  // initial load if main empty or user opened specific file
  const current = window.location.pathname.split('/').pop() || 'index.html';
  loadPage(current);
}

function loadPage(url) {
  // avoid reload if already on same URL
  const main = document.querySelector('main.container');
  if (!main) return;

  fetch(url)
    .then(r => {
      if (!r.ok) throw new Error('Network error');
      return r.text();
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newMain = doc.querySelector('main.container');
      if (newMain) {
        main.innerHTML = newMain.innerHTML;
        // move focus to main for accessibility
        main.focus();
        // Re-init validators & accessibility on new content
        // (we import slightly differently to avoid circular imports)
        import('./validation.js').then(m => m.initValidation());
        import('./accessibility.js').then(m => m.initAccessibility());
      }
    })
    .catch(err => {
      console.error('Erro ao carregar página:', err);
    });
}