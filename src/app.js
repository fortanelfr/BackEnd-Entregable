import "dotenv/config.js";
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
import cookieParser from 'cookie-parser'
import expressSession from 'express-session';
import MongoStore  from 'connect-mongo';
import is_admin from "./middlewares/is_admin.js";
import axios from "axios";
import passport from "passport";
import inicializePassport from "./middlewares/passport.js";


const manager = new ProductManager();
const PORT = 8080
const ready = ()=> {
      console.log('server ready on port '+ PORT)
      connect('mongodb+srv://fortanelfr:1234@proyectos.0tcjtyo.mongodb.net/ecommerce')
           .then(()=> console.log('database connected'))
           .catch( err => console.log(err))
} 


const app = express();

app.use(cookieParser(process.env.SECRET_COOKIE))
 
app.use(expressSession({
    store: MongoStore.create({
        mongoUrl: process.env.LINK_DB,
        ttl:60*60*24*7
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))

const httpServer = app.listen(PORT,ready)

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
inicializePassport()
app.use(passport.initialize())
app.use(passport.session())
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

    socket.on('create_user',async data=>{
        //var axios = require('axios');

        axios.post("http://localhost:8080/api/auth/register", data)
             .then((res) => {
                socket.emit("respuestaCreacion",res.data)
                }).catch((err) => {
                    socket.emit("respuestaCreacion",err.response.data)
                });
    })
    
    socket.on('login',async data=>{
        //var axios = require('axios');

        axios.post("http://localhost:8080/api/auth/login", data)
             .then((res) => {
                socket.emit("respuestaCreacion",res.data)
                }).catch((err) => {
                    socket.emit("respuestaCreacion",err.response.data)
                });
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
    

