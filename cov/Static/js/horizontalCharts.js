



$('#state').on('change',function (){
var url = '/state/date/' + $(this).val()
    $.ajax({
        url: url,
        type:'GET',
        success:function(response) {
             console.log(response.list[0])
        }
    })
})










$('#state').on('change',function (){
var url = '/apicov/state/' + $(this).val()
    $.ajax({
        url: url,
        type:'GET',
        success:function(response){
        var ctx = $('#myChartHorizontal')[0].getContext('2d')
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Casos Suspeitos','Casos Confirmados','Recuperados ','Mortes'],
                datasets: [{
                    label: 'Dados extraídos por Estado',
                    data: [response.list[0].suspects,response.list[0].cases,
                        response.list[0].refuses,response.list[0].deaths],
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
        var ctx = document.getElementById('myChart');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Casos Suspeitos','Recuperados ','Mortes'],
                    datasets: [{
                        label: 'Dados extraídos por Estado',
                        data: [response.list[0].suspects, response.list[0].refuses,
                               response.list[0].deaths],
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
            Chart.plugins.register({
                beforeDraw: function(chartInstance) {
                var ctx = chartInstance.chart.ctx;
                ctx.fillStyle = '#27293d';
                ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
                }
            })
        },
    })
})



