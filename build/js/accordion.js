(function accordion() {
    var button = document.getElementById('newsButton');
    var body = document.getElementById('newsBody');
    var wrapper = document.getElementById('newsWrap');
    if (!button) { return; }

    body.style.maxHeight = wrapper.clientHeight + 12 + 'px';

    button.onclick = function() {
        this.classList.toggle('_opened');
        body.style.maxHeight = body.style.maxHeight ? null : wrapper.clientHeight + 12 + 'px';
    };
})();

(function numberSpace() {
    var numbers = document.querySelectorAll('.amount__integer');

    numbers.forEach(function(number) {
        number.innerHTML = number.innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    });
})();