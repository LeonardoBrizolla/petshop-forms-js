const birthDate = document.querySelector('[data-input-nascimento]');
birthDate.addEventListener('blur', (event) =>
  verificationBirthDate(event.target)
);

function verificationBirthDate(inputDate) {
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
