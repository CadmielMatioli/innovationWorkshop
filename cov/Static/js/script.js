
$.get('/apicov/states/', function(array){
var data = array.list

var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Casos Confirmados', 'Mortes'],
        datasets: [{
            label: '# of Votes',
            data: [44655, 11313],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
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



//-------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------
  let states = [];
  let cases = [];

  for(let i in data){
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
                'rgba(54, 162, 235, 1)',
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

//**********************************************************************************************
//**********************************************************************************************
//*************moris Charts*********************************************************************

  function initializeCharts() {
    Morris.Donut({
      element: 'donutChart',
      data: [{
        value: 40,
        label: 'SS',
      }, {
        value: 15,
        label: 'baz'
      }, {
        value: 35,
        label: 'bar'
      }, {
        value: 15,
        label: 'baz'
      }, ],
      labelColor: '#23AE89',
      colors: colors
    });

    Morris.Bar({
      element: 'barChart',
      data: [
           { y: 'Jan', a: 55, b: 90, c: 12 },
           { y: 'Feb', a: 65, b: 15, c: 16 },
           { y: 'Mar', a: 50, b: 40, c: 05 },
           { y: 'May', a: 95, b: 65, c: 65 },
           { y: 'Jun', a: 50, b: 40, c: 20 },
           { y: 'Jul', a: 75, b: 65, c: 85 },
           { y: 'Aug', a: 10, b: 90, c: 90 },
           { y: 'Sep', a: 15, b: 65, c: 07 },
           { y: 'Oct', a: 75, b: 18, c: 13 },
           { y: 'Nov', a: 15, b: 65, c: 03 },
           { y: 'Dec', a: 03, b: 95, c: 02 }
          ],

      xkey: 'y',
      ykeys: ['a', 'b', 'c' , 'd', 'e'],
      barColors: [

        '#39C7AA',
        '#1C7EBB',
        '#E94B3B',
      ],
      labels: ['Series ASH', 'Series SS']
    });

    Morris.Area({
      element: 'areaChart',
      lineColors: colors,
      data: [{
        y: '2006',
        a: 100,
        b: 90
      }, {
        y: '2007',
        a: 75,
        b: 65
      }, {
        y: '2008',
        a: 50,
        b: 40
      }, {
        y: '2009',
        a: 75,
        b: 65
      }, {
        y: '2010',
        a: 50,
        b: 40
      }, {
        y: '2011',
        a: 75,
        b: 65
      }, {
        y: '2012',
        a: 100,
        b: 90
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series ASH', 'Series SS']
    });

  }
  initializeCharts();


}).done(function() {
    //alert( "second success" );
  })
  .fail(function() {
    alert( "error" );
  })



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
    setTimeout(function () {
      initializeCharts();
    }, 200);
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


