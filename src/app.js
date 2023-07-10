import express from 'express';
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products',productRouter);
app.use('/api/cart',cartRouter);

/*
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


app.post("/products", async (req,res)=>{
    
    const producto = req.body;

    if(!producto.title){
        return res.status(400).send({status:'error',error: "incomplete values"})
    }
    
    await manager.addProduct(producto);
    return res.status(400).send({status:'success',message:'user created'})   

})


app.put("/products/:id", async (req,res)=>{
    
    const producto = req.body;
    const productId = Number(req.params.id)

    if(!producto.title){
        return res.status(400).send({status:'error',error: "incomplete values"})
    }
    
    const respuesta = await manager.updateProduct(productId,producto);
    if(respuesta === "Not found"){
        return res.status(400).send({status:'error',error: respuesta})
    } else {
        return res.status(200).send({status:'success',message:respuesta})
    }
       

})



app.delete ("/products/:id",async (req,res)=>{
    const productId = Number(req.params.id);
    const respuesta = await manager.deleteProduct(productId);

    if(respuesta === "Not found"){
        return res.status(400).send({status:'error',error: respuesta})
    } else {
        return res.status(200).send({status:'success',message:respuesta})
    }



})
*/

app.listen(8080,() => console.log('Levantando el puerto 8080'))