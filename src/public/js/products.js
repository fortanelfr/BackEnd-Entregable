const socket = io();
socket.emit('message','Hola, me estoy comunicando desde');
socket.emit('carga',1)



const page = document.getElementById('page');
page.value = 1
const previus = document.getElementById('previus');


previus.addEventListener('click', evt =>{
    console.log(page.value)
    if(page.value >1){
        page.value = page.value - 1
        socket.emit('changePage', {text:title_v.value,page:page.value});
    }
})

const next = document.getElementById('next');
next.addEventListener('click', evt =>{
    page.value =  parseInt(page.value)  + 1
    socket.emit('changePage', {text:title_v.value,page:page.value});
})


const title_v = document.getElementById('title_filter');
const filter_button = document.getElementById('button_filter');

filter_button.addEventListener('click', evt =>{
        socket.emit('filter', {text:title_v.value,page:page.value});

})




socket.on('updateList',data=>{
   
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
        c1.innerText = producto['_id']
        c2.innerText = producto['title']
        c3.innerText = producto['description']
        c4.innerText = producto['code']
        c5.innerText = producto['price']
        c6.innerText = producto['status']
        c7.innerText = producto['stock']
        c8.innerText = producto['category']
    });
    
})



const close_session = document.getElementById('close_session');
close_session.addEventListener('click', evt => {
    socket.emit('close_session', 'hola');
})




