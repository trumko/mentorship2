// Add item to list on click
$('.add-item').click(function(event) {
  event.preventDefault();

  if ($('.add-input').val().trim() == '') {
    $('.add-input').val('');
    return;
  }

  $.ajax({
    method: 'POST',
    url: '/add-item',
    data: {item: $('.add-input').val()}
  })
    .done( function(msg) {
      $('.add-input').val('');
      $('.all-items').html(generateList(msg.items));
  });
})

// Delete all items from list
$('.del-items').click(function(event) {
  event.preventDefault();

  $.ajax({
    method: 'DELETE',
    url: '/delete-items',
  })
    .done(function(msg) {
      $('.all-items').html(generateList(msg.items));
  });
})

// Get all items when page is loaded
$(function() {
  $.ajax({
    method: 'GET',
    url: '/get-items',
  })
    .done(function( msg ) {
      console.log(msg[0].items);
      $('.all-items').html(generateList(msg[0].items));
  });
});


function generateList(itemData) {
  console.log(itemData)

  var itemList = itemData.reduce(function(prevList, current){
    return prevList + '<li>' + current + '</li>'
  }, '')
  console.log(itemList);
  return '<ul>' + itemList + '</ul>'
}
