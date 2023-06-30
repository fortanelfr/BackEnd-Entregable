import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const manager = new ProductManager("./src/products.json");

app.use(express.urlencoded({extended:true}));



app.get("/products",async (req,res)=>{
    const productos = await manager.getProducts();
    
    let {limit} = req.query;
    res.send(productos.slice(0, limit))

})

app.get("/products/:pid",async (req,res)=>{
    
    let pid = parseInt(req.params.pid);

    const productos = await manager.getProductById(pid);
    res.send(productos);

})


app.listen(8080,() => console.log('Levantando el puerto 8080'))