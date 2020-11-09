

$('#state').on('change',function (){


var url = '/apicov/state/' + $(this).val()
   $.ajax({
        url: url,
        type:'GET',
          success:function(response){
            console.log(response.list[0])
              var ctx = $('#myChartHorizontal')[0].getContext('2d')

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Casos Suspeitos','Casos Confirmados','Recuperados ','Mortes'],
                    datasets: [{
                        label: 'Dados extraídos por Estado',
                        data: [response.list[0].suspects,response.list[0].cases,
                            response.list[0].refuses,response.list[0].deaths],
                        backgroundColor: ['#e6f9ff','#ccf2ff','#b3ecff','#99e6ff'],
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
                    }
                }
            });
        }
    })
})



