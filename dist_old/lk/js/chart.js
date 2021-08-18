(function toggleCard() {
    var buttons = document.querySelectorAll('.cell__header-button button');
    buttons.forEach(function(button) {
        var scrollContainer = button.parentElement.parentElement.parentElement.querySelector('.js-scroll');
        if (scrollContainer) {
          var scroll = new PerfectScrollbar(scrollContainer);
        }
        button.addEventListener('click', function(e) {
            var wrapper = this.closest('.cell__wrapper')
            var body = wrapper.querySelector('.cell__body');
            var activeClass = this.dataset.template;
            if (body.classList.contains('activeList')) { body.classList.remove('activeList'); }
            if (body.classList.contains('activePie')) { body.classList.remove('activePie'); }

            body.classList.add(activeClass);
            var buttons = wrapper.querySelector('.cell__header-button').querySelectorAll('button');
            buttons.forEach(function(button) {
                if (body.classList.contains(button.dataset.template)) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
            if (scroll) {
                scroll.destroy();
                scroll = new PerfectScrollbar(scrollContainer);
            }
        });
    });
})();

var color = Chart.helpers.color;
var _seed = Date.now();

function rand(min, max) {
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    _seed = (_seed * 9301 + 49297) % 233280;
    return min + (_seed / 233280) * (max - min);
}

function randomScalingFactor() {
    return Math.round(rand(10, 30));
}

function randomCountFactor() {
    return Math.round(rand(10000, 2500000));
}

var lineData = [
    {
        date: 1532623668,
        paid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
        unpaid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
    },
    {
        date: 1532710068,
        paid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
        unpaid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
    },
    {
        date: 1532796468,
        paid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
        unpaid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
    },
    {
        date: 1532882868,
        paid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
        unpaid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
    },
    {
        date: 1532969268,
        paid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
        unpaid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
    },
    {
        date: 1533055668,
        paid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
        unpaid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
    },
    {
        date: 1533142068,
        paid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
        unpaid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
    },
    {
        date: 1533228468,
        paid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
        unpaid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
    },
    {
        date: 1533314868,
        paid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
        unpaid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
    },
    {
        date: 1533401268,
        paid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
        unpaid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
    },
    {
        date: 1533487668,
        paid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
        unpaid: {
            data: randomScalingFactor(),
            count: randomCountFactor()
        },
    },
];

function customTooltips(tooltip, id, chart) {
    // Tooltip Element
    var tooltipEl = document.getElementById(id);

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.classList.add('chartjs-tooltip');
        tooltipEl.id = id;
        tooltipEl.innerHTML = '<table></table>';
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
    } else {
        tooltipEl.classList.add('no-transform');
    }

    // Set Text
    if (tooltip.body) {
        var index = tooltip.dataPoints[0].index;
        var titleLines = tooltip.title || [];

        var date = lineData[index].date;
        var innerHtml = '<thead>';

        titleLines.forEach(function() {
            innerHtml += '<tr><th colspan="2">' + moment(date, 'X').format('DD.MM.YY hh:mm') + '</th></tr>';
        });
        innerHtml += '</thead><tbody>';

        innerHtml += '<tr>' +
            '<td>' +
                '<p class="paid">Оплачено:</p>' +
                '<p>' + lineData[index].paid.data + 'шт' + '</p>' +
                '<p>' + formatPrice(lineData[index].paid.count) + '</p>' +
            '</td>' +
            '<td>' +
                '<p class="unpaid">Не оплачено:</p>' +
                '<p>' + lineData[index].unpaid.data + 'шт' + '</p>' +
                '<p>' + formatPrice(lineData[index].unpaid.count) + '</p>' +
            '</td>' +
            '</tr>';
        innerHtml += '</tbody>';

        var tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
    }

    var positionY = chart.canvas.offsetTop;
    var positionX = chart.canvas.offsetLeft;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
}

function formatPrice(price) {
    return price.toFixed(2).toString().split('.').map(function(item, i) {
        switch (i) {
            case 0:
                return item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            case 1:
                // return `<span class="decimal-wrapper">,${item}</span>`;
                // return +item > 0 ? `, <sup class="decimal-wrapper">${ item }</sup> ₽` : null;
                return +item > 0 ? `, ${ item }` : null;
        }
    }).join('') + ' ₽';
}

(function chartLine() {

    var line = document.getElementById('line');
    if (!line) { return; }
    var ctx = line.getContext('2d');

    Chart.defaults.global.pointHitDetectionRadius = 1;

    new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: lineData.map(function(data) {
                return moment(data.date, 'X').format('DD.MM');
            }),

            datasets: [{
                pointRadius: 5,
                pointHoverRadius: 5,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointHoverBorderColor: '#fff',
                pointHoverBackgroundColor: '#4BC0C0',
                label: 'Оплачено',
                backgroundColor: color('#4BC0C0').alpha(0.05).rgbString(),
                borderColor: '#4BC0C0',
                pointBackgroundColor: '#4BC0C0',
                data: lineData.map(function(data) {
                    return data.paid.data;
                }),
                count: lineData.map(function(data) {
                    return data.paid.count;
                }),
            }, {
                pointRadius: 5,
                pointHoverRadius: 5,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointHoverBorderColor: '#fff',
                pointHoverBackgroundColor: '#FF6383',
                label: 'Не оплачено',
                backgroundColor: color('#FF6383').alpha(0.05).rgbString(),
                borderColor: '#FF6383',
                pointBackgroundColor: '#FF6383',
                data: lineData.map(function(data) {
                    return data.unpaid.data;
                }),
                count: lineData.map(function(data) {
                    return data.unpaid.count;
                }),
            }
            ]
        },

        // Configuration options go here
        options: {
            animation: false,
            pointDotRadius: 1,
            pointDotStrokeWidth: 8,
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 2,
                    right: 0,
                    top: 26,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {
                        fontColor: "#7b7b7b",
                        fontFamily: "'Roboto'",
                        fontSize: 10,
                        fontStyle: 900,
                        // padding: 20,
                        labelOffset: 30,
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false,
                        drawOnChartArea: false,
                        tickMarkLength: 12,
                    },
                }],
                yAxes: [{
                    ticks: {
                        fontColor: "#7b7b7b",
                        fontFamily: "'Roboto'",
                        fontSize: 10,
                        fontStyle: 900,
                        padding: 12,
                        beginAtZero: true,
                        stepSize: 10,
                    },
                    gridLines: {
                        color: 'rgba(235, 235, 235, 1)',
                        drawTicks: false,
                        drawBorder: false,
                        zeroLineColor: 'rgba(235, 235, 235, 1)',
                        // tickMarkLength: 12,
                    },
                }],
            },
            legend: {
                display: false,
            },
            tooltips: {
                enabled: false,
                position: 'average',
                custom: function(tooltip) {
                    customTooltips(tooltip, 'chart_line_tooltip', this._chart);
                },
                intersect: false,
                mode: 'index',
            },
        }

    });
})();

(function chartPie() {
    var pies = document.querySelectorAll('.chart_pie');
    if (!pies) { return; }
    pies.forEach(function(pie) {
        var ctx = pie.querySelector('canvas').getContext('2d');

        var data = {
            datasets: [{
                data: [2, 3, 10, 12, 73],
                backgroundColor: [
                    "#4BC0C0",
                    "#9363FF",
                    "#4BC04B",
                    "#FFD163",
                    "#FF6383",
                ],
                borderWidth: 4,
                borderColor: '#fff',
                count: [11235.23, 45125.32, 154.25, 8569.74, 4521.56],
            }],
            labels: [
                'EcoSet',
                'Health',
                'Porno',
                'Games',
                'Other',
            ],

        };

        var options = {
            animation: false,
            legend: {
                display: false,
            },
            maintainAspectRatio: false,

            tooltips: {
                enabled: true,
                custom: function(tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                },
                callbacks: {
                    beforeLabel: function(tooltipItem, data) {
                        return data.labels[tooltipItem.index];
                    },
                    label: function(tooltipItem, data) {
                        return data.datasets[0].data[tooltipItem.index] + '%';
                    },
                    afterLabel: function(tooltipItem, data) {
                        return formatPrice(data.datasets[tooltipItem.datasetIndex].count[tooltipItem.index]);
                    },
                },
                bodyFontSize: 12,
                bodyFontStyle: 'bold',
                xPadding: 18,
                yPadding: 16,
            },
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options,
        });
    });

})();

$(function() {
    $('.js-toggle-chart').on('click', function() {
        $('.js-toggle-chart').removeClass('_active');
        $(this).addClass('_active');
        $('.chart[data-type]').removeClass('chart_active');
        $('.chart[data-type="'+$(this).data('type')+'"]').addClass('chart_active');
    });
});

(function () {
    var bar = document.querySelector('#bar');
    if (!bar) { return; }

    var ctx = bar.getContext('2d');

    var barChartData = {
        labels: lineData.map(function(data) {
            return moment(data.date, 'X').format('DD.MM');
        }),
        datasets: [{
            label: 'Оплачено',
            backgroundColor: color('#4BC0C0').alpha(0.5).rgbString(),
            borderColor: '#4BC0C0',
            borderWidth: 1,
            data: lineData.map(function(data) {
                return data.paid.data;
            }),
            count: lineData.map(function(data) {
                return data.paid.count;
            }),
            hoverBorderWidth: 0,
            hoverBorderColor: '#fff',
        }, {
            label: 'Не оплачено',
            backgroundColor: color('#FF6383').alpha(0.5).rgbString(),
            borderColor: '#FF6383',
            borderWidth: 1,
            data: lineData.map(function(data) {
                return data.unpaid.data;
            }),
            count: lineData.map(function(data) {
                return data.unpaid.count;
            }),
            hoverBorderWidth: 0,
            hoverBorderColor: '#fff',
        }],
    };

    new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            hoverBorderColor: '#fff',
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltips: {
                enabled: false,
                position: 'average',
                custom: function(tooltip) {
                    customTooltips(tooltip, 'chart_bar_tooltip', this._chart);
                },
                intersect: false,
                mode: 'index',
            },
        }
    });
})();
