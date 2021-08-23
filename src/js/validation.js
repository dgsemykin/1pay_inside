var card = document.querySelector('.card-form__number input');
var icon = document.querySelector('.field__type-icon');
var cardIcon = document.querySelector('._card');
var error = document.querySelector('.field__error');
var validity = document.querySelector('.card-form__validity input');
var cvc = document.querySelector('.card-form__cvc input');
var validitySeparator = document.querySelector('.card-form__validity .field__body');
// const sendButton = document.querySelector('.card-form__button');
// const footerButton = document.querySelector('.footer__button');

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

(function checkFieldError() {
  var browser;
  if (navigator.userAgent.search(/Android|iPhone|iPad/) > 0) {browser = 'mobile'};

  var fields = document.querySelectorAll('.field');
  var validitySeparator = document.querySelector('.card-form__validity .field__body');
  var cardholderInput = document.querySelector('.card-form__cardholder input');
  var cardNumberInput = document.querySelector('.card-form__number input');
  var cardValidityInput = document.querySelector('.card-form__validity input');
  var cardholderField = document.querySelector('.card-form__cardholder');
  var cvc = document.querySelector('.card-form__cvc input');
  var successFields = document.querySelectorAll('.success');
  var footerButton = document.querySelector('.footer');
  const footerSend = document.querySelector('.footer__button');

  const errorMessage = document.querySelector('.error-message');
  const errorMessageText = document.querySelector('.error-message__text');

  const date = new Date;
  if (!fields) { return; }

  function removeFromString(mystring, char) {
    const regex = new RegExp(char, 'g');
    return mystring.replace(regex, '');
  }

  fields.forEach(function(field) {
    var input = field.querySelector('.field__input');
    if (!input) { return; }

    input.onblur = function() {
      validitySeparator.classList.remove('_active');
      cvc.placeholder = '123';

      if (field.classList.contains('_required')) {
        if (this.value) {
          var values = Array.from(this.value);
          values.forEach(function (val) {
            if (val === '\u2000') {
              field.classList.remove('success');
              field.classList.add('error');
            } else {
              field.classList.remove('error');
              field.classList.add('success');
            }
          });
        } else {
          field.classList.remove('success');
          field.classList.remove('error');
        }
      }
      successFields = document.querySelectorAll('.success');
      if (successFields.length === 4) {
        footerButton.classList.add('_success')
      } else {
        footerButton.classList.remove('_success')
      }
    };

    function showError(errorText) {
      errorMessage.classList.add('error-message_active')
      errorMessageText.innerText = errorText;
    }
    
    // setTimeout(function() {showError('Hello')}, 2000);

    function checkValid() { 
      const monthDateForCheckValidity = +(date.getMonth() + 1);
      const yearDateForCheckValidity = +(date.getFullYear().toString().substr(-2));
      const strValidityValue = removeFromString(validity.value, ' ');
      const monthFromValue = +(strValidityValue.substr(0,2));
      const yearFromValue = +(strValidityValue.substr(2));

      if (yearFromValue > yearDateForCheckValidity) {
        return true
      } else if (yearFromValue == yearDateForCheckValidity && monthFromValue > monthDateForCheckValidity) {
        return true
      } else {
        return false
      }
    }

    cardValidityInput.onkeyup = function () {
      values = Array.from(this.value);
  
      const validityField = document.querySelector('.card-form__validity')
      if (values.length === 0) {
        cardValidityInput.focus();
        } else if (!values.includes('\u2000') && !(checkValid())) {
          validityField.classList.remove('success');
          validityField.classList.add('error');
          showError('Срок действия карты истек')
        } else if (!values.includes('\u2000') && checkValid()) {
          validityField.classList.remove('error');
          validityField.classList.add('success');
          cvc.focus();
        } 
    };

    cvc.onkeyup = function () {
      values = Array.from(this.value);
      if (values.length === 0) {
        cvc.focus();
      } else if (!values.includes('\u2000')) {
        cardholderInput.focus();
      }
    };

    if (browser === 'mobile') {
      cardholderInput.onkeydown = function () {
        if (cardholderInput.value.length >= 0) {
          cardholderField.classList.add('success');
          successFields = document.querySelectorAll('.success');
          if (successFields.length === 4) {
            footerSend.removeAttribute('disabled')
            footerButton.classList.add('_success')
          } else {
            footerSend.setAttribute('disabled')
            footerButton.classList.remove('_success')
          }
        }
      };
    } else {
      cardholderInput.onkeypress = function () {
        if (cardholderInput.value.length >= 0) {
          cardholderField.classList.add('success');
          successFields = document.querySelectorAll('.success');
          if (successFields.length === 4) {
            console.log(footerSend)
            footerSend.removeAttribute('disabled')
            footerButton.classList.add('_success')
          } else {
            footerButton.classList.remove('_success')
            footerSend.setAttribute('disabled', true)
          }
        }
      };
    }
    
  cardholderInput.onkeyup = function () {
    if (!cardholderInput.value) {
      footerSend.setAttribute('disabled', true)
      cardholderField.classList.remove('success');
      footerButton.classList.remove('_success')
    }
  }
  });
})();
