$('.add-item').click(function(event) {
  event.preventDefault();

  $.ajax({
    method: "PUT",
    url: "/input.txt",
    data: JSON.stringify({data: $('.add-input').val()})
  })
    .done(function( msg ) {
      console.log( "Data Saved: " + msg );
  });
})
console.log(123)
