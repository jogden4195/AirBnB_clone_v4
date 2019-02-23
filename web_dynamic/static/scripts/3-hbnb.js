$(function () {
  const checkedItems = {};
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      checkedItems[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedItems[$(this).data('id')];
    }
    let filler_text = Object.values(checkedItems).join(', ');
    $('div.amenities h4').text(filler_text);
  });
});

$(function () {
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data, status) {
    if (status == "success") {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});

$(function () {
  const url = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.post(url, {}, function (data, status) {
     if (status == 'success') {
       for (let place of data) {
         $('section.places').after('<article>' + place + '</article>');
       }
     }
   }, 'json');