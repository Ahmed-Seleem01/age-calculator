const submitBtn = document.querySelector('.card__button');
const formInputsElms = document.querySelectorAll('.card__input');

const validateDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
  return false;
};

const validateMonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
  return false;
};

const validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  if (year && year > 0 && year <= currentYear) {
    return true;
  }
  return false;
};

const isValidDate = (dayElm, monthElm, yearElm) => {
  const isValid = [false, false, false];

  if (!validateDay(dayElm.value)) {
    dayElm.classList.add('card__input--error');
  } else {
    dayElm.classList.remove('card__input--error');
    isValid[0] = true;
  }
  if (!validateMonth(monthElm.value)) {
    monthElm.classList.add('card__input--error');
  } else {
    monthElm.classList.remove('card__input--error');
    isValid[1] = true;
  }
  if (!validateYear(yearElm.value)) {
    yearElm.classList.add('card__input--error');
  } else {
    yearElm.classList.remove('card__input--error');
    isValid[2] = true;
  }

  return isValid.every((item) => item === true);
};

const ageCalculator = (year, month, day) => {
  const today = new Date();
  const birthday = new Date(year, month - 1, day);
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();

  if (age === 0) {
    return age;
  }

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
    age -= 1;
  }

  return age;
};

const onClickHandler = () => {
  const dayElm = document.querySelector('#day');
  const monthElm = document.querySelector('#month');
  const yearElm = document.querySelector('#year');
  const resultElm = document.querySelector('.card__resultValue');

  if (!isValidDate(dayElm, monthElm, yearElm)) {
    resultElm.textContent = '--';
    return;
  }
  resultElm.textContent = ageCalculator(yearElm.value, monthElm.value, dayElm.value);
};

submitBtn.addEventListener('click', onClickHandler);

formInputsElms.forEach((input) => {
  input.addEventListener('keydown', (event) => {
    event.key === 'Enter' && onClickHandler();
  });
});
