export function validation(input) {
  const typeOfInput = input.dataset.type;

  if (validators[typeOfInput]) {
    validators[typeOfInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove('input-container--invalido');
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
  } else {
    input.parentElement.classList.add('input-container--invalido');
    input.parentElement.querySelector('.input-mensagem-erro').innerHTML =
      showMessageError(typeOfInput, input);
  }
}

const typeOfErrors = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'customError',
];

const errorMessage = {
  name: {
    valueMissing: 'O campo nome não pode estar vazio.',
  },
  email: {
    valueMissing: 'O campo de email não pode estar vazio.',
    typeMismatch: 'E-mail digitado não é válido',
  },
  password: {
    valueMissing: 'O campo de senha não pode estar vazio.',
    patternMismatch: 'Minimo 8 caracteres, e ao menos uma letra e um numero',
  },
  birthDate: {
    valueMissing: 'O campo de data de nascimento não pode estar vazio.',
    customError: 'Não é permitido se cadastrar pessoas maiores de 18 anos!',
  },
  cpf: {
    valueMissing: 'O campo de CPF não pode estar vazio',
    customError: 'O CPF digitado não é válido',
  },
};

const validators = {
  birthDate: (input) => validationBirthDate(input),
  cpf: (input) => checkCPF(input),
};

function showMessageError(typeOfInput, input) {
  let message = '';

  typeOfErrors.forEach((typeError) => {
    if (input.validity[typeError]) {
      message = errorMessage[typeOfInput][typeError];
    }
  });

  return message;
}

function validationBirthDate(inputDate) {
  const birthDate = new Date(inputDate.value);
  let message = '';

  if (!isOver18(birthDate))
    message = 'Só é permitido se cadastrar pessoas maiores de 18 anos!';

  inputDate.setCustomValidity(message);
}

function isOver18(birthDate) {
  const currentDate = new Date();
  const birthDatePlus18 = new Date(
    birthDate.getUTCFullYear() + 18,
    birthDate.getUTCMonth(),
    birthDate.getUTCDay()
  );

  return birthDatePlus18 <= currentDate;
}

// CPF
function checkCPF(input) {
  const cpfFormatted = input.value.replace(/\D/g, '');
  let message = '';

  if (!checkRepeatedCPF(cpfFormatted)) message = 'O CPF digitado não é válido';

  input.setCustomValidity(message);
}

function checkRepeatedCPF(cpf) {
  const repeatedValues = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];
  let cpfValid = true;

  repeatedValues.forEach((value) => {
    if (value === cpf) cpfValid = false;
  });

  return cpfValid;
}
