const socket = io();



const title_v = document.getElementById('title');
const description_v = document.getElementById('description');
const code_v = document.getElementById('code');
const price_v = document.getElementById('price');
const status_v = document.getElementById('status');
const stock_v = document.getElementById('stock');
const category_v = document.getElementById('category');


const button_creacion = document.getElementById('button_creacion');

button_creacion.addEventListener("click", async evt =>{
    
    const producto = {title:title_v.value,description:description_v.value,code:code_v.value,price:price_v.value,status:status_v.value,stock:stock_v.value,category:category_v.value};
    socket.emit('create', producto);
});


socket.on('respuestaCreacion',data=>{
    console.log(data)
    const respuesta = document.getElementById('respuesta');
    respuesta.innerHTML = data
    

})



