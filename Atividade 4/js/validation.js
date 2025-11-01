export function initValidation() {
  const form = document.querySelector('form');
  if (!form) return;

  // removemos handlers anteriores (caso SPA tenha re-iniciado)
  form.removeEventListener && form.removeEventListener('submit', submitHandler);
  form.addEventListener('submit', submitHandler);

  function submitHandler(e) {
    let valid = true;
    // remove mensagens anteriores
    form.querySelectorAll('.error-message').forEach(el => el.remove());

    // For each required input
    form.querySelectorAll('input[required]').forEach(input => {
      const id = input.id;
      const val = input.value.trim();

      // empty?
      if (!val) {
        showError(input, 'Campo obrigatório');
        valid = false;
      } else {
        // specific validations
        if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            showError(input, 'E-mail inválido');
            valid = false;
          } else {
            // announce success to sr-only container if present
            updateLiveRegion(id, '');
          }
        }
        if (id === 'cpf') {
          const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
          if (!cpfRegex.test(val)) {
            showError(input, 'CPF inválido (use 000.000.000-00)');
            valid = false;
          } else {
            updateLiveRegion(id, '');
          }
        }
      }
    });

    if (!valid) {
      e.preventDefault();
      // move focus to first error
      const first = form.querySelector('.error-message');
      if (first) first.previousElementSibling.focus();
    } else {
      // allow submit; but for demo we prevent default and show success
      e.preventDefault();
      showSuccess('Cadastro enviado com sucesso (demo).');
      form.reset();
    }
  }

  function showError(input, message) {
    const id = input.id;
    const sr = document.getElementById(id + 'Help');
    if (sr) sr.textContent = message;
    const err = document.createElement('span');
    err.className = 'error-message';
    err.textContent = message;
    input.insertAdjacentElement('afterend', err);
    input.setAttribute('aria-invalid', 'true');
  }

  function updateLiveRegion(inputId, text) {
    const sr = document.getElementById(inputId + 'Help');
    if (sr) sr.textContent = text;
  }

  function showSuccess(msg) {
    // create accessible toast/alert
    let alert = document.createElement('div');
    alert.className = 'alert-success';
    alert.setAttribute('role','status');
    alert.textContent = msg;
    form.insertAdjacentElement('beforebegin', alert);
    setTimeout(() => alert.remove(), 4000);
  }
}