
var card = document.querySelector('.card-form__number input');
var icon = document.querySelector('.field__type-icon');
var cardIcon = document.querySelector('._card');
var error = document.querySelector('.field__error');
var validity = document.querySelector('.card-form__validity input');
var cvc = document.querySelector('.card-form__cvc input');
var validitySeparator = document.querySelector('.card-form__validity .field__body');
var sixteenDigitsMask = [/\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, /\d/,];
var thirteenDigitsMask = [/\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/,];
var nineteenDigitsMask = [/\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/,];

  var controls = [{
    name: 'card',
    inputs: document.querySelectorAll('.card-form__number input'),
    mask: [/\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, /\d/,],
  },
    {
      name: 'validity',
      inputs: document.querySelectorAll('.card-form__validity input'),
      mask: [/[0, 1]/, /\d/, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', /\d/, /\d/]
    },
    {
      name: 'cvc',
      inputs: document.querySelectorAll('.card-form__cvc input'),
      mask: [/\d/, /\d/, /\d/]
    },
    {
      name: 'alfaLogin',
      inputs: document.querySelectorAll('.card-form__alpha-login input'),
      mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
    },
    {
      name: 'phone',
      inputs: document.querySelectorAll('.card-form__phone input'),
      mask: [/[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]
    }
  ];
  controls.forEach(function(control) {
    if (control.inputs.length) {
      control.inputs.forEach(function(input) {
        control.maskController = vanillaTextMask.maskInput({
          inputElement: input,
          mask: control.mask,
          placeholderChar: '\u2000',
        });
      });
    }
  });

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
      controls[0].maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: sixteenDigitsMask,
        placeholderChar: '\u2000',
      })
    } else if (card.value === '45\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000') {
      icon.classList.add('_visa');
      controls[0].maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: thirteenDigitsMask,
        placeholderChar: '\u2000',
      })
    } else if (card.value === '5\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000') {
      icon.classList.add('_mastercard');
      controls[0].maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: sixteenDigitsMask,
        placeholderChar: '\u2000',
      })
    } else if (card.value === '54\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000') {
      icon.classList.add('_mastercard');
      card.maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: nineteenDigitsMask,
        placeholderChar: '\u2000',
      })
    } else if (card.value === '6\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000') {
      icon.classList.add('_maestro');
      controls[0].maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: sixteenDigitsMask,
        placeholderChar: '\u2000',
      })
    } else if (card.value === '63\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000   \u2000\u2000\u2000\u2000') {
      icon.classList.add('_maestro');
      card.maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: nineteenDigitsMask,
        placeholderChar: '\u2000',
      })
    } else if (card.value === '') {
      icon.classList.remove('_visa', '_mastercard', '_maestro');
    }
  };
}

