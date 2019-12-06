(function initSelect() {
  var selects = document.querySelectorAll('.select-input');
  selects.forEach(function(e) {
    console.log(e);
    new CustomSelect({ elem: e.id });
    e.addEventListener('change', function() {
      console.log('event');
    })
  });
})();


(function initMultiSelect() {
  var selects = document.querySelectorAll('.multi-select');
  selects.forEach(function(select) {
    var value = select.querySelector('.multi-select__value');
    var valueText = 'Все';
    var container = select.querySelector('.multi-select__container');
    var list = select.querySelector('.multi-select__list');
    var options = select.querySelectorAll('.checkbox');
    var values = [];
    var optionValues = {};

    var ps = new PerfectScrollbar(list);

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.multi-select')) {
        selects.forEach(function(select) {
          select.classList.remove('is-open');
        });
      } else {
        if (!(e.target.parentElement.contains(select) || select.contains(e.target))) {
          select.classList.remove('is-open');
        }
      }
    });

    value.addEventListener('click', function() {
      select.classList.toggle('is-open');
    });

    options.forEach(function(option) {
      var input = option.querySelector('.checkbox__input');
      var label = option.querySelector('.checkbox__label');
      optionValues[input.value] = label.innerHTML;
      input.addEventListener('change', function() {
        if (input.checked) {
          values.push(input.value);
        } else {
          values = values.filter(function(value) {
            return value !== input.value;
          });
        }
        if (values.length > 1) {
          valueText = 'Выбрано: ' + values.length;
        } else if (values.length === 1) {
          if (input.checked) {
            valueText = label.innerHTML;
          } else {
            valueText = optionValues[values[0]];
          }
        } if (values.length === 0) {
          valueText = '';
        } else if (values.length === Object.values(optionValues).length) {
          valueText = 'Все';
        }
        value.innerHTML = valueText;
      });
    });
  });
})();

(function initInlineSelect() {
  var selects = document.querySelectorAll('.inline-select');
  selects.forEach(function(select) {
    var value = select.querySelector('.inline-select__value');
    var valueText = 'Все';
    var container = select.querySelector('.inline-select__container');
    var list = select.querySelector('.inline-select__list');
    var options = select.querySelectorAll('.radio');

    var ps = new PerfectScrollbar(list);

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.inline-select')) {
        selects.forEach(function(select) {
          select.classList.remove('is-open');
        });
      } else {
        if (!(e.target.parentElement.contains(select) || select.contains(e.target))) {
          select.classList.remove('is-open');
        }
      }
    });

    value.addEventListener('click', function() {
      select.classList.toggle('is-open');
    });

    options.forEach(function(option) {
      var input = option.querySelector('.radio__input');
      var label = option.querySelector('.radio__label');
      input.addEventListener('change', function() {
        valueText = label.innerHTML;
        value.innerHTML = valueText;
      });
    });
  });
})();

(function contextMenu() {
  var contexts = document.querySelectorAll('.js-call-context');
  contexts.forEach(function(context) {
    var contextContainer = context.nextElementSibling;
    if (contextContainer) {
      var items = contextContainer.querySelectorAll('.context-menu__item');
      items.forEach(function(item) {
        item.addEventListener('click', function() {
          context.classList.remove('_opened');
        });
      });
    }
    context.addEventListener('click', function() {
      context.classList.toggle('_opened');
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.context-menu') && !e.target.closest('.js-call-context')) {
        contexts.forEach(function(context) {
          context.classList.remove('_opened');
        });
      } else if (contextContainer &&
                 !(e.target.parentElement.contains(contextContainer) || contextContainer.contains(e.target)) &&
                 !e.target.closest('.js-call-context')) {
        context.classList.remove('_opened');
      }
    });
  });
})();


(function popupCalls() {
  var popupCalls = document.querySelectorAll('[data-event="popup"]');
  var closeHandlers = document.querySelectorAll('[data-event="popup-close"]');

  popupCalls.forEach(function(call) {
    var selector = call.attributes.getNamedItem('data-popup').value;
    var popup = document.querySelector('.popup[data-popup="' + selector + '"]');

    var paymentDetails = popup.querySelector('.payment-details__scroll');
    if (paymentDetails) { new PerfectScrollbar(paymentDetails); }

    call.addEventListener('click', function() {
      showPopup(popup);
    });
  });

  closeHandlers.forEach(function(close) {
    var selector = close.attributes.getNamedItem('data-popup').value;
    var popup = document.querySelector('.popup[data-popup="' + selector + '"]');
    close.addEventListener('click', function() {
      closePopup(popup);
    });
  });
})();

(function numericInput() {
  var containers = document.querySelectorAll('.field._numeric');
  containers.forEach(function(field) {
    var up = field.querySelector('.field__numeric-control._up');
    var down = field.querySelector('.field__numeric-control._down');
    var input = field.querySelector('input');
    var step =  parseFloat(input.attributes.getNamedItem('data-step') && input.attributes.getNamedItem('data-step').value || 1);

    up.addEventListener('click', function() {
      var value = input.value.split(' ');
      value[0] = parseFloat(value[0]) + step;
      input.value = value.join(' ');
    });

    down.addEventListener('click', function() {
      var value = input.value.split(' ');
      value[0] = parseFloat(value[0]) - step;
      input.value = value.join(' ');
    });
  });
})();

(function fillInput() {
  var values = document.querySelectorAll('[data-fill]');
  values.forEach(function(value) {
    value.addEventListener('click', function() {
      var field = document.querySelector('input[data-field="' + value.attributes.getNamedItem('data-field').value + '"]');
      field.value = value.attributes.getNamedItem('data-fill').value;
    });
  });
})();

(function switchSecurity() {
  var switcher = document.querySelector('.js-security-switch');
  if (switcher) {
    switcher.addEventListener('change', function() {
      if (switcher.checked) {
        showPopup(document.querySelector('.popup[data-popup="security-popup"]'));
      } else {
        showPopup(document.querySelector('.popup[data-popup="security-alert"]'));
      }
    });
  }
})();

(function checkFieldError() {
  var fields = document.querySelectorAll('.field');
  if (!fields) { return; }
  fields.forEach(function(field) {
    var input = field.querySelector('.field__input');
    if (!input) { return; }

    input.onblur = function() {
      if (field.classList.contains('_required')) {
        if (this.value) {
          var values = Array.from(this.value);
          values.forEach(function (val) {
            if (val === '_') {
              field.classList.remove('success');
              field.classList.add('error');
            } else {
              field.classList.remove('error');
              field.classList.add('success');
            }
          });
        } else {
          field.classList.remove('success');
          field.classList.add('error');
        }
      }
      var successFields = document.querySelectorAll('.success');
      var footerButton = document.querySelector('.footer');
      if (successFields.length >= 4) {
        footerButton.classList.add('success')
      } else {
        footerButton.classList.remove('success')
      }
    };
  });
})();

(function initScroll() {
  var scrollContainers = document.querySelectorAll('.js-perfect-scrollbar');
  scrollContainers.forEach(function(container) {
    new PerfectScrollbar(container);
  });
})();

(function setMask() {
  var controls = [
    {
      name: 'phone',
      inputs: document.querySelectorAll('[data-mask="phone"]'),
      mask: ['+', '7', ' ', /[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]
    }
  ];
  controls.forEach(function(control) {
    if (control.inputs.length) {
      control.inputs.forEach(function(input) {
        control.maskController = vanillaTextMask.maskInput({
          inputElement: input,
          mask: control.mask
        });
      });
    }
  });
})();

(function addingEmail() {
  var btn = document.querySelector('[data-event=\'add-email\']');
  if (!btn) { return; }
  var emailTemplate = document.querySelector('#email-template');
  var container = document.querySelector('[data-container=\'email\']');
  btn.addEventListener(('click'), function() {
    var row = document.importNode(emailTemplate.content, true);
    removeParent(row.querySelector('[data-event=\'remove-parent\']'));
    container.appendChild(row);
  });
})();

(function initRemoveParent() {
  var btns = document.querySelectorAll('[data-event=\'remove-parent\']');
  btns.forEach(function(btn) {
    removeParent(btn);
  });
})();


// Global remove parent
function removeParent(btn) {
  var parent = btn.parentElement;
  if (!parent) { return; }
  btn.addEventListener('click', function() {
    parent.parentNode.removeChild(parent);
  });
}

// Global popup calls
function showPopup(popup) {
  var openedPopups = document.querySelectorAll('.popup__wrap .popup');
  openedPopups.forEach(function (popup) {
    closePopup(popup);
  });
  var div = document.createElement('div');
  div.classList.add('popup__wrap');
  popup.parentElement.insertBefore(div, popup);
  div.appendChild(popup);
  div.addEventListener('click', function(e) {
    if (e.target.className === 'popup__wrap')
      closePopup(popup)
  });
}

function closePopup(popup) {
  if (popup.closest('.popup__wrap')) {
    var tmp = document.createDocumentFragment();
    var parent = popup.parentNode;
    while (parent.firstChild) {
      var child = parent.removeChild(parent.firstChild);
      tmp.appendChild(child);
    }
    parent.parentNode.replaceChild(tmp, parent);
  }
}