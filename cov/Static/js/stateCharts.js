var chartTitle = $('.chart-title');
var url = $('#state').data('url');
$('#messageGenetingPdf').html('Gerando Dados <input type="text" class="loader">');
$.getJSON(url, function (data) {
    var html = '';
    $(data.list).each(function (index, val) {
        if(val.uf == 'SP'){
            html += '<option value="' + val.uf + '" selected>' + val.state + '</option>';
            chartLineDaysState(val.uf)
            chartPie(val.suspects, val.refuses, val.deaths)
            chartLine(val.suspects, val.refuses, val.deaths, val.cases)
            chartTitle.html(val.state)
        }else{
            html += '<option value="' + val.uf + '">' + val.state + '</option>';
        }
    });
    $('#state').html(html);
});

$('#state').on('change',function (){
var url = '/apicov/state/' + $(this).val()
    $.ajax({
        url: url,
        type:'GET',
        success:function(response){
            chartTitle.html(response.list[0].state)
            chartLineDaysState(response.list[0].uf)
            chartPie(response.list[0].suspects, response.list[0].refuses, response.list[0].deaths)
            chartLine(response.list[0].suspects, response.list[0].refuses, response.list[0].deaths, response.list[0].cases)
        },
    })
})

function chartPie(suspects, refuses, deaths){
    var ctx = $('#myChart')[0].getContext('2d')
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Casos Suspeitos','Recuperados ','Mortes'],
            datasets: [{
                label: 'Dados extraídos por Estado',
                data: [suspects, refuses, deaths],
                  backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(59, 179, 91, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(59, 179, 91, 0.2)',
                    'rgba(255, 99, 132, 0.5)',
                ],
            }],

        },
    });
}

function chartLine(suspects, refuses, deaths, cases){
    var ctx = $('#myChartHorizontal')[0].getContext('2d')
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Casos Suspeitos','Casos Confirmados','Recuperados ','Mortes'],
            datasets: [{
                label: 'Dados extraídos por Estado',
                data: [suspects, cases, refuses, deaths],
              backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(245, 66, 239, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
                labels: ['Red']
            }],
            borderWidth: 1
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            },

        }
    });
}


$.get('/apicov/states/', function(array) {
    var data = array.list
    let states = [];
    let cases = [];
    var borderColor = [];
    var backgroundColor = [];
    for (let i in data) {
        states.push(data[i].state);
        cases.push(data[i].cases);
        backgroundColor[i] = 'rgba('+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+''+ ', 0.2)';
    }
    var ctx = document.getElementById('mixedChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: states,
            datasets: [{
                label: 'Casos Confirmados',
                data: cases,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                borderWidth: 1
            }]
        },
    });
});

function chartLineDaysState(uf){
    $('#messageGenetingPdf').show();
    var url = $('#line-chart-state-date').data('url')
    var color_label = new Array();
    $.ajax({
        type: 'GET',
        url: url,
        success: function (response) {
            $('#messageGenetingPdf').hide()
            let state = [];
            let cases = [];
            var filtrado = response.list.filter(function (obj) {
                return obj.uf == uf;
            });
            for (let i in filtrado) {
                state.push(filtrado[i].datetime);
                cases.push(filtrado[i].cases);
                color_label[i] =  'rgba(255, 99, 132, 1)';
            }
            var ctx = document.getElementById('line-chart-state-date').getContext('2d');
            var config = {
                type: 'line',
                data: {
                    labels: state,
                    datasets: [{
                        label: 'Casos',
                        data: cases,
                        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                        borderColor: color_label,
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: false
                            },
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            },
                        }]
                    }
                }
            }
            var casosChart = new Chart(ctx, config);
        },
    });
}


 Chart.plugins.register({
    beforeDraw: function(chartInstance) {
    var ctx = chartInstance.chart.ctx;
    ctx.fillStyle = '#27293d';
    ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
    }
})