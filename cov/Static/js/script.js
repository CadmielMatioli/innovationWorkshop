
$.get('/apicov/states/', function(array) {
    var data = array.list

    //----------------------------------------------------------------------------------------------------
    let states = [];
    let cases = [];

    for (let i in data) {
        states.push(data[i].state);
        cases.push(data[i].cases);
    }

    var ctx = document.getElementById('mixedChart');
    var mixedChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: states,
            datasets: [{
                label: 'Casos Confirmados',
                data: cases,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(245, 66, 239, 2)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    Chart.plugins.register({
        beforeDraw: function (chartInstance) {
            var ctx = chartInstance.chart.ctx;
            ctx.fillStyle = '#27293d';
            ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
        }
    })
}).done(function() {
    //alert( "second success" );
  })
  .fail(function() {
    alert( "error" );
});


$(function() {

  $(document).on("click", function (e) {
    var $item = $(".rad-dropmenu-item");
    if ($item.hasClass("active")) {
      $item.removeClass("active");
    }
  });

  $(".rad-toggle-btn").on('click', function () {
    $(".rad-sidebar").toggleClass("rad-nav-min");
    $(".rad-body-wrapper").toggleClass("rad-nav-min");
  });

  $(".rad-dropdown >.rad-menu-item").on('click', function (e) {
    e.stopPropagation();
    $(".rad-dropmenu-item").removeClass("active");
    $(this).next(".rad-dropmenu-item").toggleClass("active");
  });


  var panelList = $('.row');

  panelList.sortable({
    handle: '.row',
    update: function () {
      $('.panel', panelList).each(function (index, elem) {
        var $listItem = $(elem),
            newIndex = $listItem.index();
      });
    }
  });
});