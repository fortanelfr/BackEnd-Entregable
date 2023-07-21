import express from 'express';
import handlebars from 'express-handlebars';
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js'
import {Server} from 'socket.io'

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


socketServer.on('connection',socket=>{
    console.log('Nuevo cliente conectado')

    socket.on('message',data=>{
        console.log(data)
    })

    socket.emit('socket_actual','1')

    socket.broadcast.emit('socket excluido','2')

    socketServer.emit('para todos','3')
    
})


//app.listen(8080,() => console.log('Levantando el puerto 8080'))