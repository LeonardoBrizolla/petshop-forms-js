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
};

const validators = {
  birthDate: (input) => validationBirthDate(input),
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
