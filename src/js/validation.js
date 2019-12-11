
var card = document.querySelector('.card-form__number input');
var icon = document.querySelector('.field__type-icon');
var cardIcon = document.querySelector('._card');
var error = document.querySelector('.field__error');
var validity = document.querySelector('.card-form__validity input');
var cvc = document.querySelector('.card-form__cvc input');
var validitySeparator = document.querySelector('.card-form__validity .field__body');

if (card) {
  validity.onfocus = function () {
    validitySeparator.classList.add('_active');
  };

  cvc.onfocus = function () {
    cvc.placeholder = '';
  };

  cardIcon.onmouseover = function () {
    var cardForm = document.querySelector('.card-form__number');
    if (cardForm.classList.contains('error')) {
      error.classList.add('_active');
    }
  };

  cardIcon.onmouseleave = function () {
    var cardForm = document.querySelector('.card-form__number');
    if (cardForm.classList.contains('error')) {
      error.classList.remove('_active');
    }
  };

  card.onkeydown = function (){
    if (card.value === '4\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000') {
      icon.classList.add('_visa');
    } else if (card.value === '5\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000') {
      icon.classList.add('_mastercard');
    } else if (card.value === '6\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000') {
      icon.classList.add('_maestro');
    } else if (card.value === '') {
      icon.classList.remove('_visa', '_mastercard', '_maestro');
    }
  };
}

