var chartTitle = $('.chart-title');
var url = $('#state').data('url');
$.getJSON(url, function (data) {
    var html = '<option value="" selected>Selecione um estado</option>';
    $(data.list).each(function (index, val) {
        if(val.uf == 'SP'){
            html += '<option value="' + val.uf + '" selected>' + val.state + '</option>';
            chartPie(val.suspects, val.refuses, val.deaths)
            chartLine(val.suspects, val.refuses, val.deaths, val.cases)
            chartTitle.html(val.state)
        }
        html += '<option value="' + val.uf + '">' + val.state + '</option>';
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
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(245, 66, 239, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                }],

            },
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
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
        borderColor[i] = 'rgba('+Math.floor(Math.random()*255)+', '+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+''+ ', 0.5)';
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
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
    });
});

 Chart.plugins.register({
    beforeDraw: function(chartInstance) {
    var ctx = chartInstance.chart.ctx;
    ctx.fillStyle = '#27293d';
    ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
    }
})