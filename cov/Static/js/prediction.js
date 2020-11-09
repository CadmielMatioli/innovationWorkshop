var pred = $('#prediction-chart');
var chartPred = pred[0].getContext('2d');
var url;
var x = new Array();
var y = new Array();
var color = new Array();
var backgroundColor = new Array();
url = pred.data('url')
$.ajax({
    type:'GET',
    url:url,

    success: function(response){
         $.each(response.list[0].X, function(index, i){
             x[index] = i;
             color[index] = 'rgba('+Math.floor(Math.random() * 54)+', '+Math.floor(Math.random() * 162)+', '+Math.floor(Math.random() * 255)+''+ ', 0.2)';
             backgroundColor[index] = 'rgba('+Math.floor(Math.random() * 54)+', '+Math.floor(Math.random() * 162)+', '+Math.floor(Math.random() * 255)+''+ ', 1)';

         })
        $.each(response.list[0].y, function(index, i){
             y[index] = i;
             color[index] = 'rgba('+Math.floor(Math.random() * 54)+', '+Math.floor(Math.random() * 162)+', '+Math.floor(Math.random() * 255)+''+ ', 0.2)';
             backgroundColor[index] = 'rgba('+Math.floor(Math.random() * 54)+', '+Math.floor(Math.random() * 162)+', '+Math.floor(Math.random() * 255)+''+ ', 1)';

         })
        new Chart(chartPred, {
             type: 'line',
            data: {
                labels: y,
                datasets: [{
                    label: 'x',
                    data: x,
                    backgroundColor: color,
                    borderColor: backgroundColor,
                    borderWidth: 1
                },{
                    label: 'x_ticks',
                    data: response.list[0].x_ticks,
                    backgroundColor: color,
                    borderColor: backgroundColor,
                    borderWidth: 1
                }],
            }
        });
    },
    error: function(){

    }
})