document.addEventListener('DOMContentLoaded', function () {
    var options = {
        valueNames: [
            {attr: 'data-timestamp', name: 'date'},
            'id',
            'name',
            'category',
            'site',
            'status',
            {attr: 'data-income', name: 'income-total'},
            {attr: 'data-income', name: 'income-week'}
        ]
    };

    var projectsList = new List('projects', options);
});