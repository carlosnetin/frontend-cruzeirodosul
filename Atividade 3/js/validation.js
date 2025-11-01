export function initValidation() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    let valid = true;
    form.querySelectorAll('.error-message').forEach(el => el.remove());

    form.querySelectorAll('input[required]').forEach(input => {
      if (!input.value) { showError(input, 'Campo obrigatório'); valid = false; }
      if (input.id === 'cpf') {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(input.value)) { showError(input, 'CPF inválido (000.000.000-00)'); valid = false; }
      }
      if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) { showError(input, 'E-mail inválido'); valid = false; }
      }
    });

    if (!valid) e.preventDefault();
  });
}

function showError(input, message) {
  const error = document.createElement('span');
  error.className = 'error-message';
  error.textContent = message;
  input.insertAdjacentElement('afterend', error);
}