if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

(function createSlide() {
    var sliderWrap = document.querySelector('.payways-slide');
    var slider = document.querySelector('.payways-slide__slider');
    if (slider && tns) {
        var paymentSwipe = tns({
            container: slider,
            items: 4,
            fixedWidth: 84,
            loop: false,
            nav: false,
            controlsText: ['', ''],
            slideBy: 1,
            gutter: 8,
            edgePadding: 16
        });
        paymentSwipe.events.on('transitionEnd', function() {
            var sliderInfo = paymentSwipe.getInfo();
            if (sliderInfo.index + sliderInfo.items === sliderInfo.slideCount) {
                sliderWrap.className = sliderWrap.className + ' _end';
                sliderWrap.className = sliderWrap.className.replace(/ _start/g, '');
            } else if (sliderInfo.index === 0) {
                sliderWrap.className = sliderWrap.className + ' _start';
                sliderWrap.className = sliderWrap.className.replace(/ _end/g, '');
            } else {
                sliderWrap.className = sliderWrap.className.replace(/ _start/g, '');
                sliderWrap.className = sliderWrap.className.replace(/ _end/g, '');
            }
        });
    }
})();

(function setMask() {
    var controls = [{
            name: 'card',
            inputs: document.querySelectorAll('.card-form__number input'),
            mask: [/\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, /\d/, ' ', ' ', ' ', /\d/, /\d/, /\d/, /\d/],
        },
        {
            name: 'validity',
            inputs: document.querySelectorAll('.card-form__validity input'),
            mask: [/[0, 1]/, /\d/, ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', /\d/, /\d/]
        },
        // {
        //     name: 'cvc',
        //     inputs: document.querySelectorAll('.card-form__cvc input'),
        //     mask: [/\d/, /\d/, /\d/]
        // },
        {
            name: 'alfaLogin',
            inputs: document.querySelectorAll('.card-form__alpha-login input'),
            mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
        },
        {
            name: 'phone',
            inputs: document.querySelectorAll('.card-form__phone input'),
            mask: [/[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]
        },
        // {
        //     name: 'cardholder',
        //     inputs: document.querySelectorAll('.card-form__cardholder input'),
        //     mask: [/[A-Z]/]
        // }
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
})();

var cardBodyHeight = 0;
var cardOffset = 0;
var heightForList = 0;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
(function changePayway() {
    var changeButton = document.querySelector('.chosen-payway__change') || document.querySelector('.chosen-payway__btn');
    var body = document.querySelector('body');
    var wrap = document.querySelector('.wrap');
    var card = document.querySelector('.card');
    var header = document.querySelector('.header');
    var cardBody = document.querySelector('.card__body');
    var screen1 = document.querySelector('.screen-1');
    var screen2 = document.querySelector('.screen-2');
    var footer = document.querySelector('.footer');
    var outcard = document.querySelector('.outcard');

    var moveCardScreen2 = function() {
        if (screen1.className.indexOf('_hidden') > -1) {
            var groups = document.querySelectorAll('.payways__group');
            var maxHeight = 32;
            groups.forEach(function(group) {
                maxHeight += parseFloat(group.clientHeight) + 16;
            });
            screen2.style.height = heightForList + 'px';
            cardBody.style.height = heightForList + 'px';
            cardBody.style.maxHeight = maxHeight + 'px';
            cardBody.style.minHeight = 0;
            if (maxHeight > heightForList) {
                cardBody.className += ' _shadowed';
                var ps = new PerfectScrollbar(screen2);
                screen2.addEventListener('ps-scroll-y', function() {
                    if (ps.scrollbarYTop === 0) {
                        cardBody.className += ' _on-top';
                        cardBody.className = cardBody.className.replace(/ _on-bottom/g, '');
                    } else if (ps.scrollbarYTop + ps.scrollbarYHeight === ps.railYHeight) {
                        cardBody.className += ' _on-bottom';
                        cardBody.className = cardBody.className.replace(/ _on-top/g, '');
                    } else {
                        cardBody.className = cardBody.className.replace(/ _on-bottom/g, '');
                        cardBody.className = cardBody.className.replace(/ _on-top/g, '');
                    }
                });
            } else {
                cardBody.className = cardBody.className.replace(/ _shadowed/g, '');
            }
        }
    }
    if (changeButton) {
        var wrapPadding = 120;
        if (isMobile) {
            wrapPadding = 50;
        }
        window.addEventListener('resize', function() {
            var wrapHeight = wrap.clientHeight;
            var headerHeight = header.clientHeight;
            heightForList = wrapHeight - wrapPadding - headerHeight;
            moveCardScreen2();
        });
        changeButton.onclick = function() {
            var wrapHeight = wrap.clientHeight;
            var headerHeight = header.clientHeight;
            // Запоминаем после первого переключения высоту блока с выбранным способом оплаты
            if (!cardBodyHeight) { cardBodyHeight = screen1.clientHeight + 'px'; }
            header.style.height = headerHeight + 'px';
            header.style.borderBottom = '1px solid #ebebeb';
            cardBody.style.minHeight = cardBodyHeight;
            cardBody.className += ' _on-top';
            screen1.className += ' _hidden';

            var groups = document.querySelectorAll('.payways__group');
            var maxHeight = 32;
            groups.forEach(function(group) {
                maxHeight += parseFloat(group.clientHeight) + 16;
            });

            // Считаем размер списка один раз чтобы не было ошибка на мобилах при повторном переключении
            if (!isMobile) {
                heightForList = wrapHeight - wrapPadding - headerHeight - cardOffset;
            } else if (!heightForList && isMobile) {
                heightForList = body.clientHeight - wrapPadding - headerHeight - 30;
            }

            if (maxHeight > heightForList) {
                screen2.style.height = heightForList + 'px';
            } else {
                screen2.style.height = maxHeight + 'px';
            }

            // Настраиваем карточку для отображения засветов и иконки мышки
            cardBody.style.height = heightForList + 'px';
            cardBody.style.maxHeight = maxHeight + 'px';
            cardBody.style.minHeight = 0;

            // Обрабатываем скролл внутри платежей, чтобы переключать иконку мыши и тени сверху и снизу
            // Если maxHeight <= heightForList - всё влезло без скролла - скролл не показываем
            if (maxHeight > heightForList) {
                cardBody.className += ' _shadowed';
                var ps = new PerfectScrollbar(screen2);
                screen2.addEventListener('ps-scroll-y', function() {
                    if (ps.scrollbarYTop === 0) {
                        cardBody.className += ' _on-top';
                        cardBody.className = cardBody.className.replace(/ _on-bottom/g, '');
                    } else if (ps.scrollbarYTop + ps.scrollbarYHeight === ps.railYHeight) {
                        cardBody.className += ' _on-bottom';
                        cardBody.className = cardBody.className.replace(/ _on-top/g, '');
                    } else {
                        cardBody.className = cardBody.className.replace(/ _on-bottom/g, '');
                        cardBody.className = cardBody.className.replace(/ _on-top/g, '');
                    }
                });
            }
            // Скрываем первое окно(на всякий случай)
            screen1.style.height = 0;
            footer.className += ' _hidden';
            outcard.style.display = 'none';
        }
    }
})();

(function selectPayway() {
    var wrap = document.querySelector('.wrap');
    var card = document.querySelector('.card');
    var header = document.querySelector('.header');
    var payways = document.querySelectorAll('.payways .payway');
    var cardBody = document.querySelector('.card__body');
    var screen1 = document.querySelector('.screen-1');
    var screen2 = document.querySelector('.screen-2');
    var footer = document.querySelector('.footer');
    var outcard = document.querySelector('.outcard');
    var moveCardScreen1 = function() {}
    if (payways) {
        window.addEventListener('resize', function() {
            moveCardScreen1();
        });
        payways.forEach(function(payway) {
            payway.onclick = function() {
                payways.forEach(function(payway) {
                    payway.className = payway.className.replace(/ _selected/g, '');
                });
                payway.classList.add('_selected');

                // Если есть окно выбора платежа, возвращаем к нему
                if (screen1) {
                    screen2.style.height = 0;
                    screen1.className = screen1.className.replace(/ _hidden/g, '');
                    screen1.style.height = 'auto';
                    header.style.borderBottom = 0;

                    cardBody.style.height = cardBodyHeight;

                    cardBody.className = cardBody.className.replace(/ _on-top/g, '');
                    cardBody.className = cardBody.className.replace(/ _on-bottom/g, '');

                    header.style.height = 'auto';
                    footer.className = footer.className.replace(/ _hidden/g, '');
                    outcard.style.display = 'flex';

                    cardBody.className = cardBody.className.replace(/ _shadowed/g, '');

                    setTimeout(function() {
                        screen2.scrollTop = 0;
                    }, 1000);
                }
            }
        });
    }
})();

(function initSelect() {
    var selects = document.querySelectorAll('.select-input');
    selects.forEach(function(elem) {
        new CustomSelect({ elem: elem.id });
    });
})();