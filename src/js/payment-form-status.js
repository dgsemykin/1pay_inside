var footerSVG = document.querySelector('.footer__link');
var gradientStart = document.querySelector('#start');
var gradientStop = document.querySelector('#stop');

if (footerSVG) {
    footerSVG.onmousedown = function () {
        gradientStart.setAttribute('stop-color', '#009933');
        gradientStop.setAttribute('stop-color', '#00998C');
    };
    footerSVG.onmouseup = function () {
        gradientStart.setAttribute('stop-color', '#00B23C');
        gradientStop.setAttribute('stop-color', '#00B2A4');
    };
    footerSVG.onmouseover = function () {
        gradientStart.setAttribute('stop-color', '#00CC44');
        gradientStop.setAttribute('stop-color', '#00CCBB');
    };
    footerSVG.onmouseleave = function () {
        gradientStart.setAttribute('stop-color', '#00B23C');
        gradientStop.setAttribute('stop-color', '#00B2A4');
    };
}