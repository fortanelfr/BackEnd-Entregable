import express from 'express';
import handlebars from 'express-handlebars';
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js'
import {Server} from 'socket.io'
import ProductManager from './managers/productManager.js';


const manager = new ProductManager("./src/files/products.json");

const app = express();
const httpServer = app.listen(8080,()=> console.log("Listening 8080"))

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products',productRouter);
app.use('/api/carts',cartRouter);
app.use(express.static(__dirname + '/public'))
app.use('/',viewsRouter);


socketServer.on('connection',async socket=>{
    console.log('Nuevo cliente conectado')

    socket.on('delete',async data=>{
        const respuesta = await manager.deleteProduct(parseInt(data))
        console.log(data)

        socket.emit('updateTable',await manager.getProducts())
    })
    
    socket.on('create',async data=>{
        const respuesta = await manager.addProduct(data)
        console.log(respuesta)

        socket.emit('updateTable',await manager.getProducts())
    })
    

    //socket.broadcast.emit('socket excluido','2')

    //socketServer.emit('para todos','3')
    
    socket.emit('updateTable',await manager.getProducts())
    
})


//app.listen(8080,() => console.log('Levantando el puerto 8080'))