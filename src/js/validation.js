var card = document.querySelector('.card-form__number input');
var icon = document.querySelector('.field__type-icon');
var cardIcon = document.querySelector('._card');
var error = document.querySelector('.field__error');
var validity = document.querySelector('.card-form__validity input');
var cvc = document.querySelector('.card-form__cvc input');
var validitySeparator = document.querySelector('.card-form__validity .field__body');
const sendButton = document.querySelector('.card-form__button');
const footerButton = document.querySelector('.footer__button');

var sixteenDigitsMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/,];
var thirteenDigitsMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/,];
var fourteenDigitsMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/,];
var fifteenDigitsMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/,];
var eighteenDigitsMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/];
var nineteenDigitsMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/,];
var nineteenDigitsMaskUnionPay = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,];

  var controls = [{
    name: 'card',
    inputs: document.querySelectorAll('.card-form__number input'),
    mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/,],
  },
  {
    name: 'validity',
    inputs: document.querySelectorAll('.card-form__validity input'),
    mask: [/[0, 1]/, /\d/, ' ', ' ', ' ', ' ', ' ', ' ', ' ', /\d/, /\d/]
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
  }];
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

  card.onkeyup = function (){
    var values = Array.from(this.value);

    // VISA
    if (card.value === '4\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000') {
      icon.classList.add('_visa');
      controls[0].maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: sixteenDigitsMask,
        placeholderChar: '\u2000',
      })
    }

    // MASTERCARD
    else if (card.value === '51\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '52\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '53\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '54\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '55\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '55\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '22\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '23\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '24\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '25\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '26\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '27\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000'
    ) {
      icon.classList.add('_mastercard');
      controls[0].maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: sixteenDigitsMask,
        placeholderChar: '\u2000',
      })
    }

    //AMEX
    else if (card.value === '34\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '37\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000'
    ) {
      icon.classList.add('_amex');
      controls[0].maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: fifteenDigitsMask,
        placeholderChar: '\u2000',
      })
    }

    //Diners Club International
    else if (card.value === '300\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '301\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '302\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '303\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '304\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '305\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '309\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '36\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '36\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '38\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '39\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000'
    ) {
      icon.classList.add('_dinersclub');
      controls[0].maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: fourteenDigitsMask,
        placeholderChar: '\u2000',
      })
    }

    //JCB
    else if (card.value === '352\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '353\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '354\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '355\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '356\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '357\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '358\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000'
    ) {
      icon.classList.add('_jcb');
      controls[0].maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: sixteenDigitsMask,
        placeholderChar: '\u2000',
      })
    }

    //MIR
    else if (card.value === '2200 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '2201 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '2202 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '2203 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '2204 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000'
    ) {
      icon.classList.add('_mir');
      controls[0].maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: sixteenDigitsMask,
        placeholderChar: '\u2000',
      })
    }

  //UnionPay
    else if (card.value === '62\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000') {
      icon.classList.add('_unionpay');
      controls[0].maskController.destroy();
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: sixteenDigitsMask,
        placeholderChar: '\u2000',
      })
      card.onkeypress = function () {
        values = Array.from(card.value);
        if (!values.includes('\u2000')) {
          values = Array.from(card.value);
          card.maskController.destroy();
          card.maskController = vanillaTextMask.maskInput({
            inputElement: card,
            mask: nineteenDigitsMaskUnionPay,
            placeholderChar: '\u2000',
          })
        }
      }
    }

    //MAESTRO
    else if (card.value === '50\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '56\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '57\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '58\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '60\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '61\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '62\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '63\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '64\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '65\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '66\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '67\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '68\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000' ||
      card.value === '69\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000 \u2000\u2000\u2000\u2000'
    ) {
      icon.classList.add('_maestro');
      controls[0].maskController.destroy();
      if (card.maskController) {
        card.maskController.destroy();
      }
      setTimeout(set13Mask, 5);

      function set13Mask () {
        card.maskController = vanillaTextMask.maskInput({
          inputElement: card,
          mask: thirteenDigitsMask,
          placeholderChar: '\u2000',
        })
      }
      
      function set15Masks () {
        card.maskController = vanillaTextMask.maskInput({
          inputElement: card,
          mask: fifteenDigitsMask,
          placeholderChar: '\u2000',
        })
      }

      function set16Masks () {
        card.maskController = vanillaTextMask.maskInput({
          inputElement: card,
          mask: sixteenDigitsMask,
          placeholderChar: '\u2000',
        })
      }

      function set18Masks () {
        card.maskController = vanillaTextMask.maskInput({
          inputElement: card,
          mask: eighteenDigitsMask,
          placeholderChar: '\u2000',
        })
      }

      function set19Masks () {
        card.maskController = vanillaTextMask.maskInput({
          inputElement: card,
          mask: nineteenDigitsMask,
          placeholderChar: '\u2000',
        })
      }

      card.onkeypress = function () {
        values = Array.from(card.value);
        if (!values.includes('\u2000')) {
          values = Array.from(card.value);
          card.maskController.destroy();
          if (card.value.length === 15) {
            setTimeout(set15Masks,0);
          } else if (card.value.length === 17) {
            setTimeout(set16Masks,0);
          } else if (card.value.length === 19) {
            setTimeout(set18Masks,0);
          } else if (card.value.length === 22) {
            setTimeout(set19Masks,0);
          } else {
            setTimeout(set19Masks,0);
          }
        }
      }
    }

    else if (card.value === '') {
      icon.classList.remove('_visa');
      icon.classList.remove('_mastercard');
      icon.classList.remove('_maestro');
      icon.classList.remove('_mir');
      icon.classList.remove('_unionpay');
      icon.classList.remove('_jcb');
      icon.classList.remove('_dinersclub');
      icon.classList.remove('_amex');
      if (card.maskController) {
        card.maskController.destroy();
      }
      card.onkeypress = function () {
      };
      card.maskController = vanillaTextMask.maskInput({
        inputElement: card,
        mask: sixteenDigitsMask,
        placeholderChar: '\u2000',
      })
    }
  };
}

footerButton.addEventListener('click', () => {
  sendButton.click();
})