import express from 'express';
import handlebars from 'express-handlebars';
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import authRouter from './routes/auth.router.js'
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js'
import {Server} from 'socket.io'
import ProductManager from './managers/productManager.js';
import { connect } from 'mongoose';


const manager = new ProductManager();
const PORT = 8080
const ready = ()=> {
      console.log('server ready on port '+ PORT)
      connect('mongodb+srv://fortanelfr:1234@proyectos.0tcjtyo.mongodb.net/ecommerce')
           .then(()=> console.log('database connected'))
           .catch( err => console.log(err))
} 


const app = express();
const httpServer = app.listen(PORT,ready)

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/carts',cartRouter);
app.use('/api/products',productRouter);
app.use('/api/auth',authRouter);
app.use(express.static(__dirname + '/public'))
app.use('/',viewsRouter);


socketServer.on('connection',async socket=>{
    console.log('Nuevo cliente conectado')

    socket.on('delete',async data=>{
        const respuesta = await manager.deleteProduct(data)

        socket.emit('updateTable',await manager.getProducts())
    })
    
    socket.on('create',async data=>{
        const respuesta = await manager.addProduct(data)
        socket.emit("respuestaCreacion",respuesta)
    })

    socket.on('filter',async data=>{
        const respuesta = await manager.getProducts(data['text'],data['page'])
        socket.emit("updateList",respuesta)
    })

    socket.on('changePage',async data=>{
        const respuesta = await manager.getProducts(data['text'],data['page'])
        socket.emit("updateList",respuesta)
    })

    
    

    
    socket.emit('updateTable',await manager.getProducts())
    
})
    

