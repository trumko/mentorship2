var curId = '';

// Get all items when page is loaded
$(function() {
  $.ajax({
    method: 'GET',
    url: '/all-items',
  })
    .done(function( msg ) {
      console.log(msg);
      $('.all-items').html(generateList(msg));
  });
});

// Add item to list on click
$('.add-item').click(function(event) {
  event.preventDefault();

  if ($('.add-input').val().trim() == '') {
    $('.add-input').val('');
    return;
  }

  $.ajax({
    method: 'POST',
    url: '/single-item',
    data: {content: $('.add-input').val()}
  })
    .done( function(msg) {
      $('.add-input').val('');

      $.ajax({
        method: 'GET',
        url: '/all-items',
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

  if (curId == '') {
    return
  }

  $.ajax({
    method: 'PUT',
    url: '/single-item/' + curId,
    data: {
      content: $('.add-input').val(),
    }
  })
    .done( function(msg) {
      $('.add-input').val('');

      $.ajax({
        method: 'GET',
        url: '/all-items',
      })
        .done(function( msg ) {
          console.log(msg);
          $('.all-items').html(generateList(msg));
      });
  });

  curId = '';
})

// Delete all items from list
$('.del-items').click(function(event) {
  event.preventDefault();

  $.ajax({
    method: 'DELETE',
    url: '/all-items',
  })
    .done(function(msg) {
      $.ajax({
        method: 'GET',
        url: '/all-items',
      })
        .done(function( msg ) {
          console.log(msg);
          $('.all-items').html(generateList(msg));
      });
  });
})



function delItem(id){
  console.log(id)
  $.ajax({
    method: 'DELETE',
    url: '/single-item',
    data: {id: id}
  })
    .done(function(msg) {
      $.ajax({
        method: 'GET',
        url: '/items',
      })
        .done(function( msg ) {
          console.log(msg);
          $('.all-items').html(generateList(msg));
      });
  });
}

function editItem(id, content){
  curId = id;
  $('.add-input').val(content);
}

function generateList(itemData) {
  var itemList = itemData.reduce(function(prevList, current){
    return (`${prevList}
            <li>
              <button onclick="delItem('${current._id}')">del</button>
              <button onclick="editItem('${current._id}', '${current.content}')">edit</button>
              <span>${current.content}</span>
            </li>`)
  }, '')
  console.log(itemList);
  return '<ul>' + itemList + '</ul>'
}
