export function initSPA() {
  const links = document.querySelectorAll('nav ul.menu a');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const url = link.getAttribute('href');
      loadPage(url);
      window.history.pushState(null, '', url);
    });
  });

  window.addEventListener('popstate', () => {
    loadPage(window.location.pathname.split('/').pop());
  });

  loadPage(window.location.pathname.split('/').pop() || 'index.html');
}

function loadPage(url) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const mainContent = doc.querySelector('main.container');
      const main = document.querySelector('main.container');
      if (main && mainContent) {
        main.innerHTML = mainContent.innerHTML;
      }
    })
    .catch(err => console.error('Erro ao carregar página:', err));
}