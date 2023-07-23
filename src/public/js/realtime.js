const socket = io();
socket.emit('message','Hola, me estoy comunicando desde');
socket.emit('carga',1)


const input = document.getElementById('textbox');
const button_borrar = document.getElementById('button_borrar');

const title_v = document.getElementById('title');
const description_v = document.getElementById('description');
const code_v = document.getElementById('code');
const price_v = document.getElementById('price');
const status_v = document.getElementById('status');
const stock_v = document.getElementById('stock');
const category_v = document.getElementById('category');


button_borrar.addEventListener('click', evt =>{
        socket.emit('delete', input.value);
        input.value = " ";

})

const button_creacion = document.getElementById('button_creacion');

button_creacion.addEventListener("click", evt =>{
    producto = {title:title_v.value,description:description_v.value,code:code_v.value,price:price_v.value,status:status_v.value,stock:stock_v.value,category:category_v.value};
    socket.emit('create', producto);
    
    /*
    title_v.value = " ";
    description_v.value="";
    code_v.value = "";
    price_v.value = "";
    status_v.value = "";
    stock_v.value = "";
    category_v.value = ""; 
    */
    


});




socket.on('updateTable',data=>{

    let table = document.getElementById('table');    
    
    table.innerHTML = '';
    

      let row = table.insertRow(-1);
      let c1 = row.insertCell(0)
      let c2 = row.insertCell(1)
      let c3 = row.insertCell(2)
      let c4 = row.insertCell(3)
      let c5 = row.insertCell(4)
      let c6 = row.insertCell(5)
      let c7 = row.insertCell(6)
      let c8 = row.insertCell(7)
      c1.innerText = 'id'
      c2.innerText = 'title'
      c3.innerText = 'description'
      c4.innerText = 'code'
      c5.innerText = 'price'
      c6.innerText = 'status'
      c7.innerText = 'stock'
      c8.innerText = 'category'

      
    




    data.forEach(producto =>  {
        let row = table.insertRow(-1) // We are adding at the end
           
        // Create table cells
        let c1 = row.insertCell(0)
        let c2 = row.insertCell(1)
        let c3 = row.insertCell(2)
        let c4 = row.insertCell(3)
        let c5 = row.insertCell(4)
        let c6 = row.insertCell(5)
        let c7 = row.insertCell(6)
        let c8 = row.insertCell(7)
           
              // Add data to c1 and c2
        c1.innerText = producto['id']
        c2.innerText = producto['title']
        c3.innerText = producto['description']
        c4.innerText = producto['code']
        c5.innerText = producto['price']
        c6.innerText = producto['status']
        c7.innerText = producto['stock']
        c8.innerText = producto['category']
    });
})





