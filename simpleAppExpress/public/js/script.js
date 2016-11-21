var socket = io();

var curId = '';
var isAdd = true;

socket.on('all messages', function(msg){
  console.log(msg);
  $('.all-items').html(generateList(msg))
});

// Get all items when page is loaded
$(function() {
  $.ajax({
    method: 'GET',
    url: '/all-items',
  })
    .done(function( msg ) {
      // console.log(msg);
      $('.all-items').html(generateList(msg));
  });
});

// Check if we add or edit item
$('.add-item').click(function(event) {
  event.preventDefault();
  isAdd ? addItem() : editItem()
})

function addItem() {
  if ($('.add-input').val().trim() == '') {
    return;
  }

  socket.emit('add item', $('.add-input').val());
  $('.add-input').val('');
  return false;
};

// Edit item from list
  function editItem() {
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
  $( ".add-item" ).html('ADD');
    curId = '';
    isAdd = true
  }

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

function onDelItem(id){
  $.ajax({
    method: 'DELETE',
    url: '/single-item',
    data: {id: id}
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
}

function onEditItem(id, content){
  curId = id;
  isAdd = false;
  $('.add-input').val(content);
  $( ".add-item" ).html('EDIT');
}

function generateList(itemData) {
  var itemList = itemData.reduce(function(prevList, current){
    return (`${prevList}
            <li>
              <button onclick="onDelItem('${current._id}')">del</button>
              <button onclick="onEditItem('${current._id}', '${current.content}')">edit</button>
              <span>${current.content}</span>
            </li>`)
  }, '')
  // console.log(itemList);
  return '<ul>' + itemList + '</ul>'
}
