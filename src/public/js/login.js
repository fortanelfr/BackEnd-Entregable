const socket = io();


const mail = document.getElementById('mail');
const password = document.getElementById('password');



const button_creacion = document.getElementById('button_creacion');

button_creacion.addEventListener("click", async evt =>{
    

    const user = {mail:mail.value,password:password.value};
    socket.emit('login', user);
});


socket.on('respuestaCreacion',data=>{
    const respuesta = document.getElementById('respuesta');
    respuesta.innerHTML = data.message
    if (data.token){
        location.href = "http://localhost:8080/products/";
    }
})


document.getElementById("github").onclick = function () {
    location.href = "http://localhost:8080/api/auth/github";
};



