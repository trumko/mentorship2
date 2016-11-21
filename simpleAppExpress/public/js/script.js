var socket = io();

var curId = '';
var isAdd = true;

socket.on('send all messages', function(msg) {
  console.log(msg);
  $('.all-items').html(generateList(msg))
  $('.add-input').val('');
});

// Get all items when page is loaded
$(function() {
  socket.emit('show all items', id);
});

// Check if we add or edit item
$('.add-item').click(function(event) {
  event.preventDefault();
  isAdd
    ? addItem()
    : editItem()
})

// Add item to the list
function addItem() {
  if ($('.add-input').val().trim() == '') {
    return;
  }
  socket.emit('add item', $('.add-input').val());
  return false;
};

// Edit item from the list
function editItem() {
  if (curId == '') {
    return
  }

  socket.emit('edit item', {
    curId: curId,
    value: $('.add-input').val()
  });

  $(".add-item").html('ADD');
  curId = '';
  isAdd = true
}

// Delete all items from list
$('.del-items').click(function(event) {
  event.preventDefault();
  socket.emit('del all');
  return false;
})

function onDelItem(id) {
  socket.emit('del single item', id);
}

function onEditItem(id, content) {
  curId = id;
  isAdd = false;
  $('.add-input').val(content);
  $(".add-item").html('EDIT');
}

function generateList(itemData) {
  var itemList = itemData.reduce(function(prevList, current) {
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
