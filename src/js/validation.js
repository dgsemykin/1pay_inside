
var card = document.querySelector('.card-form__number input');
// card.addEventListener('keydown', {
//   alert('hi');
// });
card.onkeydown = function (){
  console.log(card.value[0]);
if (card.value[0] = '4') {
  console.log('VISA');
} else if (card.value[0] = '5') {
  console.log('MASTERCARD');
} else if (card.value[0] = '6') {
  console.log('MAESTRO');
}
};

