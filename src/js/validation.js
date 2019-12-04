
var card = document.querySelector('.card-form__number input');
var icon = document.querySelector('.field__type-icon');

if (card) {
  card.onkeydown = function (){
    if (card.value === '4___   ____   ____   ____') {
      icon.classList.add('_visa');
    } else if (card.value === '5___   ____   ____   ____') {
      icon.classList.add('_mastercard');
    } else if (card.value === '6___   ____   ____   ____') {
      icon.classList.add('_maestro');
    } else if (card.value === '') {
      icon.classList.remove('_visa', '_mastercard', '_maestro');
    }
  };
}

