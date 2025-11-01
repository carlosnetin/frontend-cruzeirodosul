import { initSPA } from './spa.js';
import { initValidation } from './validation.js';
import { initAccessibility } from './accessibility.js';

document.addEventListener('DOMContentLoaded', () => {
  initAccessibility(); // aplica modo salvo (dark/hc) e acessibilidade extra
  initSPA();           // enable SPA navigation
  initValidation();    // validação de formulários acessível
});