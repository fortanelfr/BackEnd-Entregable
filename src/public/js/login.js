const socket = io();


const mail = document.getElementById('mail');
const password = document.getElementById('password');



const button_creacion = document.getElementById('button_creacion');

button_creacion.addEventListener("click", async evt =>{
    

    const user = {mail:mail.value,password:password.value};
    socket.emit('login', user);
});


socket.on('respuestaCreacion',data=>{
    console.log(data)
    const respuesta = document.getElementById('respuesta');
    respuesta.innerHTML = data.message

})




