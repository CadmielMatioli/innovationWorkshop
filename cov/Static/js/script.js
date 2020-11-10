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