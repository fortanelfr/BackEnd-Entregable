const socket = io();


const mail = document.getElementById('mail');
const password = document.getElementById('password');



const button_creacion = document.getElementById('button_creacion');
const respuesta = document.getElementById('respuesta');


button_creacion.addEventListener('click',(event)=>{
    event.preventDefault()		//prevenimos el evento
    let data = {mail:mail.value,password:password.value}//construimos el objeto a enviar
    let options = {			//construimos el objeto de configuracion
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    let url = `/api/auth/login` 	//definimos la ruta
    fetch(url,options)
        .then(res=>res.json())	//manejamos la respuesta
        .then(res => {if (res.token){
                localStorage.setItem('token',res.token)   
                location.href = "http://localhost:8080/products/";
            } else {
                respuesta.innerHTML = res.message
            }
        })
        .catch(err=>console.log(err))

    console.log(localStorage.getItem('token'))
})


document.getElementById("github").onclick = function () {
    location.href = "http://localhost:8080/api/auth/github";
};






