import { Router } from "express";
import CartManager from '../managers/cartManager.js';

const router = Router();
const manager = new CartManager("./src/files/carts.json");


router.get("/",async (req,res)=>{
    const carritos = await manager.getCarts();
    
    let {limit} = req.query;
    res.send(carritos.slice(0, limit))

})

router.get("/:cid",async (req,res)=>{
    
    let cid = parseInt(req.params.cid);

    const carrito = await manager.getCartById(cid);
    res.send(carrito);

})


router.post("/", async (req,res)=>{
    
    const carrito = req.body;

    if(carrito.products.length === 0){
        return res.status(400).send({status:'error',error: "The list of products is empty"})
    }
    
    await manager.addCart(carrito);
    return res.status(400).send({status:'success',message:'user created'})   

})


router.post("/:cid/product/:pid", async (req,res)=>{
    
    const quantity = req.body.quantity;
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);

    const respuesta = await manager.addProductToCar(cid,pid,quantity);

    

    if(respuesta === "Cart not found"){
        return res.status(400).send({status:'error',error: respuesta})
    } else {
        return res.status(200).send({status:'success',message:respuesta})
    }
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