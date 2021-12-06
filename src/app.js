import { validation } from './validation.js';

const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
  if (input.dataset.type === 'amount') {
    SimpleMaskMoney.setMask(input, {
      prefix: 'R$',
      suffix: '',
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ',',
      thousandsSeparator: '.',
      cursor: 'end',
    });
  }

  input.addEventListener('blur', (event) => {
    validation(event.target);
  });
});
