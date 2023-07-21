const socket = io();
socket.emit('message','Hola, me estoy comunicando desde un websocket');


socket.on('socket_actual',data=>{
    console.log(data)
})

socket.on('socket excluido',data=>{
    console.log(data)
})

socket.on('para todos',data=>{
    console.log(data)
})
