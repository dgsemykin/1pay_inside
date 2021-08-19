$(function() {
    var inputs = document.querySelectorAll('.js-datepicker');
    var config = {
        autoUpdateInput: false,
        opens: 'left',
        locale: {
            applyLabel: 'Применить',
            cancelLabel: 'Отменить',
            daysOfWeek: [
                'Вс',
                'Пн',
                'Вт',
                'Ср',
                'Чт',
                'Пт',
                'Сб',
            ],
            firstDay: 1,
            format: 'DD.MM.YY',
            fromLabel: 'от',
            toLabel: 'до',
            monthNames: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ]
        },
    };

    inputs.forEach(function(input) {
        $(input).daterangepicker(config);
        $(input).on('apply.daterangepicker', function(ev, picker) {
            $(this).text(picker.startDate.format(config.locale.format) + ' - ' + picker.endDate.format(config.locale.format));
        });
    });
});