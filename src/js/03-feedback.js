var throttle = require('lodash.throttle');

const formFeedback = document.querySelector('.feedback-form');

formFeedback.addEventListener('input', throttle(onInputText, 500));
formFeedback.addEventListener('submit', onSubmitForm);

const LOCAL_KEY = 'feedback-form-state';

let dataForm = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};

const { email, message } = formFeedback.elements;
reloadPage();

function onInputText(e) {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm));
}

function reloadPage() {
  if (dataForm) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
}

function onSubmitForm(e) {
  e.preventDefault();

  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }

  localStorage.removeItem(LOCAL_KEY);
  e.currentTarget.reset();
  dataForm = {};
}
