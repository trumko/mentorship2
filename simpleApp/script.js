// add item to JSON
$('.add-item').click(function(event) {
  event.preventDefault();

  $.ajax({
    method: "PUT",
    url: "/input-data",
    data: JSON.stringify({item: $('.add-input').val()})
  })
    .done(function( msg ) {
      console.log( "Data Saved: " + msg );
  });
})


$(function() {
  $.ajax({
    method: "GET",
    url: "/input-data",
  })
    .done(function( msg ) {
      console.log( JSON.parse(msg) );
  });
});
