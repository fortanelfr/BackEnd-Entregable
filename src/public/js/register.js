const socket = io();


const name = document.getElementById('name');
const photo = document.getElementById('photo');
const mail = document.getElementById('mail');
const age = document.getElementById('age');
const password = document.getElementById('password');




const button_creacion = document.getElementById('button_creacion');

button_creacion.addEventListener("click", async evt =>{

    const user = {name:name.value,photo:photo.value,mail:mail.value,age:age.value,rol:0,password:password.value};
    socket.emit('create_user', user);
});


socket.on('respuestaCreacion',data=>{
    console.log(data)
    const respuesta = document.getElementById('respuesta');
    respuesta.innerHTML = data.message

})

document.getElementById("github").onclick = function () {
    location.href = "http://localhost:8080/api/auth/github";
};




