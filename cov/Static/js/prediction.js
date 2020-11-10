var pred = $('#prediction-chart');
var chartPred = pred[0].getContext('2d');
var url;
var x = new Array();
var y = new Array();
var color = new Array();
var backgroundColor = new Array();
var value_x_test = new Array();
var y_pred_linear = new Array();
var y_pred_min = new Array();
var y_pred_max = new Array();
var color_x = new Array();
var backgroundColor_x = new Array();
var color_y = new Array();
var backgroundColor_y = new Array();
var value_date_prev = new Array();

var y_pred_linear_color = new Array();
var y_pred_min_color = new Array();
var y_pred_max_color = new Array();


url = pred.data('url')
$('#messageGenetingPdf').html('Gerando Dados <input type="text" class="loader">');
$('#image-pred').hide()
$.ajax({
    type:'GET',
    url:url,

    success: function(response){
        var data = response.list[0];
        $.each(data.X, function(index, i){
             x[index] = i;
             color_x[index] = 'rgba('+Math.floor(Math.random() * 54)+', '+Math.floor(Math.random() * 162)+', '+Math.floor(Math.random() * 255)+''+ ', 0.2)';
             backgroundColor_x[index] = 'rgba('+Math.floor(Math.random() * 54)+', '+Math.floor(Math.random() * 162)+', '+Math.floor(Math.random() * 255)+''+ ', 1)';

        })

        $.each(data.y, function(index, i){
            y[index] = i;
            backgroundColor_y[index] = 'rgba(2, 64, 196)';

        })
        $.each(data.X_test, function(index, i){
            value_x_test[index] = i;
            backgroundColor[index] = 'rgba(245, 66, 239, 1)'

        })

        $.each(data.y_pred_linear, function(index, i){
            y_pred_linear[index] = i;
            y_pred_linear_color[index] = 'rgba(255, 255, 255)'
        })

        $.each(data.y_pred_min, function(index, i){
            y_pred_min[index] = i;
            y_pred_min_color[index] = 'rgba(0, 148, 0)'

        })

        $.each(data.y_pred_max, function(index, i){
            y_pred_max[index] = i;
            y_pred_max_color[index] = 'rgba(255, 0, 51)'
        })

        $.each(data.date_prev, function(index, i){
            value_date_prev[index] = i;
        })

        new Chart(chartPred, {
            type: 'line',
            data: {
                labels: value_x_test,
                datasets: [
                    {
                        label: 'Y',
                        data: y,
                        // backgroundColor: color_y,
                        borderColor: backgroundColor_y,
                    },
                    {
                        label: 'Linear',
                        data: y_pred_linear,
                        // backgroundColor: color,
                        borderColor: y_pred_linear_color,
                    },
                    {
                        label: 'Minimo',
                        data: y_pred_min,
                        // backgroundColor: color,
                        borderColor: y_pred_min_color,
                    },
                    {
                        label: 'Máximo',
                        data: y_pred_max,
                        // backgroundColor: color,
                        borderColor: y_pred_max_color,
                    }
                ],
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 20000000,
                            min: 0,
                            stepSize: 1000000
                        }
                    }]
                }
            }
        });
        $('#image-pred').attr('src', $('#image-pred').data('src'))
        $('#image-pred').show()
        $('#messageGenetingPdf').hide()
    },
    error: function(){
        $('#messageGenetingPdf').css('color', 'red').html('Erro ao Gerar Dados');
        setTimeout(function(){  location.reload(); },1000);
    }
})