(function checkINNCount() {
    var max = 10;
    var inn = document.querySelector('.inn');
    if (!inn) { return; }
    var label = inn.querySelector('.field__label');
    var labelText = label.textContent;
    var input = inn.querySelector('.field__input');
    input.maxLength = max;
    var count = input.value.length;
    label.textContent = labelText + ' (' + count + '/' + max + ')';

    input.onkeyup = function() {
        input.value = input.value.replace(/\D+/g, '');
        count = input.value.length;
        label.textContent = labelText + ' (' + count + '/' + max + ')';
    };
})();

(function checkFieldError() {
    var fields = document.querySelectorAll('.field');
    if (!fields) { return; }
    fields.forEach(function(field) {
        var input = field.querySelector('.field__input');

        input.onblur = function() {
            if (field.classList.contains('email')) {
                if (validateEmail(this.value)) {
                    field.classList.remove('error');
                } else {
                    field.classList.add('error');
                }
            }
            if (field.classList.contains('inn')) {
                console.log('inn input count', this.value.count);
                if (this.value.length === 10) {
                    field.classList.remove('error');
                } else {
                    field.classList.add('error');
                }
            }
        };
    });
})();

function validateEmail(email) {
    return !!email.match('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$');
}

(function showTip() {
    var button = document.getElementById('sendAgain');
    var tip = document.getElementById('showTip');
    if (!button && !tip) { return; }
    button.onclick = function() {
        tip.classList.add('active');
        setTimeout(function() {
            tip.classList.remove('active');
        }, 5000);
    }
})();

(function showPassword() {
    var input = document.getElementById('inputPassword');
    if (!input) { return; }
    var eye = document.getElementById('buttonEye');
    eye.onclick = function() {
        if (input.getAttribute('type') != 'text') {
            input.setAttribute('type', 'text');
            eye.classList.add('show');
        } else {
            input.setAttribute('type', 'password');
            eye.classList.remove('show');
        }
    };
})();