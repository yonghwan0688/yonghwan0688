const socket = io('http://localhost:3000/chat');
const roomSocket = io('http://localhost:3000/room');
const nickname = prompt('Enter your nickname');
let currentRoom = '';

socket.on('notice', (data) => {
  $('#notice').append(`<div>${data.message}</div>`);
});

socket.on('connect', () => {
  console.log('connected');
});

function sendMessage() {
  if (currentRoom === '') {
    alert('방을 선택해주세요');
    return;
  }
  const message = $('#message').val();
  const data = { message, nickname, room: currentRoom };
  $('#chat').append(`<div><strong>${nickname}:</strong> ${message}</div>`);
  socket.emit('message', data);
}

socket.on('message', (data) => {
  $('#chat').append(
    `<div><strong>${data.nickname}:</strong> ${data.message}</div>`,
  );
});

function createRoom() {
  const room = prompt('Enter room name');
  roomSocket.emit('createRoom', { room, nickname });
}

roomSocket.on('rooms', (data) => {
  console.log(data);
  $('#rooms').empty();
  data.forEach((room) => {
    $('#rooms').append(
      `<li>${room} <button onclick="joinRoom('${room}')">Join</button></li>`,
    );
  });
});

function joinRoom(room) {
  roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
  $('#chat').empty();
  currentRoom = room;
}
