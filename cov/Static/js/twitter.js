var twitter = $('#twitter-chart');
var chart = twitter[0].getContext('2d');
url = twitter.data('url')
$.ajax({
    type: "GET",
    url: url,
    success:function (response){
        new Chart(chart, {
            type: 'pie',
            data: {
                labels: ['Positivo', 'Neutro', 'Negativo'],
                datasets: [{
                    data: [
                        response.list[0].positive,
                        response.list[0].neutral,
                        response.list[0].negative
                    ],
                    backgroundColor: [
                        'rgba(0, 255, 200, 0.6)',
                        'rgba(120, 120, 120, 0.6)',
                        'rgba(255, 115, 115, 0.6)',
                    ],
                    borderColor: [
                        'rgba(0, 255, 200, 0.6)',
                        'rgba(120, 120, 120, 0.6)',
                        'rgba(255, 115, 115, 0.6)',
                    ],
                    borderWidth: 1
                }]
            }
        });
    },
    error: function(){

    }
})