
var card = document.querySelector('.card-form__number input');
var icon = document.querySelector('.field__type-icon');

card.onkeydown = function (){
  if (card.value === '4444   4444   ____   ____') {
    icon.classList.add('_visa');
  } else if (card.value === '5555   5555   ____   ____') {
    icon.classList.add('_mastercard');
  } else if (card.value === '6666   6666   ____   ____') {
    icon.classList.add('_maestro');
  } else if (card.value === '') {
    icon.classList.remove('_visa', '_mastercard', '_maestro');
  }
};

