import { Router } from "express";
import ProductManager from '../managers/productManager.js';

const router = Router();
const manager = new ProductManager("./src/files/products.json");





router.get("/",async (req,res)=>{
    const productos = await manager.getProducts();
    
    let {limit} = req.query;
    res.send(productos.slice(0, limit))

})

router.get("/:pid",async (req,res)=>{
    
    let pid = parseInt(req.params.pid);

    const productos = await manager.getProductById(pid);
    res.send(productos);

})


router.post("/", async (req,res)=>{
    
    const producto = req.body;

    const respuesta = await manager.addProduct(producto);

    if(respuesta === 'Product created'){
        return res.status(200).send({status:'success',message:respuesta}) 
    } else {
        return res.status(400).send({status:'error',error: respuesta})
    }          
})


router.put("/:id", async (req,res)=>{
    
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



router.delete ("/:id",async (req,res)=>{
    const productId = Number(req.params.id);
    const respuesta = await manager.deleteProduct(productId);
    
    if(respuesta === "Not found"){
        return res.status(400).send({status:'error',error: respuesta})
    } else {
        return res.status(200).send({status:'success',message:respuesta})
    }



})

export default router;