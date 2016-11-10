$('.add-item').click(function(event) {
  event.preventDefault();

  $.ajax({
    method: "PUT",
    url: "/input-data",
    data: JSON.stringify({item: $('.add-input').val()})
  })
    .done(function( msg ) {
            $('.add-input').val(' ');
      $('.all-items').html(generateList(msg));
  });
})


$('.del-items').click(function(event) {
  event.preventDefault();

  $.ajax({
    method: "DELETE",
    url: "/input-data",
  })
    .done(function( msg ) {
      $('.all-items').html(generateList(msg));
  });
})


$(function() {
  $.ajax({
    method: "GET",
    url: "/input-data",
  })
    .done(function( msg ) {
      $('.all-items').html(generateList(msg));
  });
});


function generateList(jsonData) {
  var itemList = '';
  var itemData = JSON.parse(jsonData).items;

  for (key in itemData) {
    itemList += '<li>' + itemData[key] + '</li>';
  }
  return '<ul>' + itemList + '</ul>'
}
