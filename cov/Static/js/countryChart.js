var chartTitle = $('.chart-title-country');
var url = $('#country').data('url');
$.getJSON(url, function (data) {
    var html = '<option value="" selected>Selecione um Pais</option>';
    $(data.list).each(function (index, val) {
        if(val.country == 'Brazil'){
            html += '<option value="' + val.country + '" selected>' + val.country + '</option>';
            chartPie(val.confirmed, val.recovered, val.deaths)
            chartLine(val.confirmed, val.refuses, val.deaths, val.cases)
            chartTitle.html(val.country)
        }
        html += '<option value="' + val.country + '">' + val.country + '</option>';
    });

    $('#country').html(html);
});

$('#country').on('change',function (){
var url = '/apicov/country/' + $(this).val()
    $.ajax({
        url: url,
        type:'GET',
        success:function(response){
            chartTitle.html(response.list[0].country)
            chartPie(response.list[0].confirmed, response.list[0].recovered, response.list[0].deaths)
            chartLine(response.list[0].confirmed, response.list[0].recovered, response.list[0].deaths, response.list[0].cases)
        },
    })
})

function chartPie(confirmed, recovered, deaths){
    var ctx = $('#pie-chart-country')[0].getContext('2d')
    new Chart(ctx, {
        type: 'pie',
        data: {
                labels: ['Casos Confirmados','Recuperados ','Mortes'],
                datasets: [{
                    label: 'Dados extraídos por país',
                    data: [confirmed, recovered, deaths],
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

function chartLine(confirmed, recovered, deaths, cases){
    var ctx = $('#line-chart-country')[0].getContext('2d')
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Casos Confirmados','Casos','Recuperados ','Mortes'],
            datasets: [{
                label: 'Dados extraídos por país',
                data: [confirmed, cases, recovered, deaths],
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


$.get('/apicov/countries/', function(array) {
    var data = array.list
    let states = [];
    let cases = [];
    var borderColor = [];
    var backgroundColor = [];
    for (let i in data) {
        states.push(data[i].country);
        cases.push(data[i].cases);
        borderColor[i] = 'rgba('+Math.floor(Math.random()*255)+', '+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+''+ ', 0.5)';
        backgroundColor[i] = 'rgba('+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+', '+Math.floor(Math.random() * 255)+''+ ', 0.2)';
    }
    var ctx = document.getElementById('countries-chart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: states,
            datasets: [{
                label: 'Casos',
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