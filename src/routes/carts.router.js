import { Router } from "express";
import ProductManager from './productManager.js';

const router = Router();
const manager = new ProductManager("./src/carts.json");




router.get("/carts",async (req,res)=>{
    const productos = await manager.getProducts();
    
    let {limit} = req.query;
    res.send(productos.slice(0, limit))

})

router.get("/carts/:pid",async (req,res)=>{
    
    let pid = parseInt(req.params.pid);

    const productos = await manager.getProductById(pid);
    res.send(productos);

})


router.post("/carts", async (req,res)=>{
    
    const producto = req.body;

    if(!producto.title){
        return res.status(400).send({status:'error',error: "incomplete values"})
    }
    
    await manager.addProduct(producto);
    return res.status(400).send({status:'success',message:'user created'})   

})


router.put("/carts/:id", async (req,res)=>{
    
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



router.delete ("/carts/:id",async (req,res)=>{
    const productId = Number(req.params.id);
    const respuesta = await manager.deleteProduct(productId);
    
    if(respuesta === "Not found"){
        return res.status(400).send({status:'error',error: respuesta})
    } else {
        return res.status(200).send({status:'success',message:respuesta})
    }



})


export default router;