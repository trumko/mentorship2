var curId;

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
    data: {content: $('.add-input').val()}
  })
    .done( function(msg) {
      $('.add-input').val('');

      $.ajax({
        method: 'GET',
        url: '/get-items',
      })
        .done(function( msg ) {
          console.log(msg);
          $('.all-items').html(generateList(msg));
      });
  });
})

// Edit item from list
$('.edit-item').click(function(event) {
  event.preventDefault();

  $.ajax({
    method: 'PUT',
    url: '/edit-item/' + curId,
    data: {
      content: $('.add-input').val(),
    }
  })
    .done( function(msg) {
      $('.add-input').val('');

      $.ajax({
        method: 'GET',
        url: '/get-items',
      })
        .done(function( msg ) {
          console.log(msg);
          $('.all-items').html(generateList(msg));
      });
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
      // $('.all-items').html(generateList(msg.items));
      $.ajax({
        method: 'GET',
        url: '/get-items',
      })
        .done(function( msg ) {
          console.log(msg);
          $('.all-items').html(generateList(msg));
      });
  });
})

// Get all items when page is loaded
$(function() {
  $.ajax({
    method: 'GET',
    url: '/get-items',
  })
    .done(function( msg ) {
      console.log(msg);
      $('.all-items').html(generateList(msg));
  });
});


function generateList(itemData) {
  var itemList = itemData.reduce(function(prevList, current){
    return (`${prevList}
            <li>
              ${current.content}
              <button onclick="delItem('${current._id}')">del</button>
              <button onclick="editItem('${current._id}', '${current.content}')">edit</button>
            </li>`)
  }, '')
  console.log(itemList);
  return '<ul>' + itemList + '</ul>'
}

function delItem(id){
  console.log(id)
  $.ajax({
    method: 'DELETE',
    url: '/delete-item',
    data: {id: id}
  })
    .done(function(msg) {
      // $('.all-items').html(generateList(msg.items));
      $.ajax({
        method: 'GET',
        url: '/get-items',
      })
        .done(function( msg ) {
          console.log(msg);
          $('.all-items').html(generateList(msg));
      });
  });
}

function editItem(id, content){
  curId = id;
  console.log(content)
  $('.add-input').val(content);
}
