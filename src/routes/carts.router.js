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
    //Se crea un carrito vacio, lo unico que se calcula es su campo id y el campo products, el cual será un array vacio
    
    const producto = req.body;
    const respuesta = await manager.addCart();
    if (respuesta ==='Error'){
        return res.status(400).send({status:'error',error: respuesta})
    } else {
    return res.status(200).send({status:'success',message:'cart created'})
    }   
})


router.post("/:cid/product/:pid", async (req,res)=>{
    
    const quantity = req.body.quantity;
    let cid = parseInt(req.params.cid);
    let pid = parseInt(req.params.pid);

    const respuesta = await manager.addProductToCar(cid,pid,quantity);

    

    if(respuesta === "Cart has been updated"){
        return res.status(200).send({status:'success',message: respuesta})
    } else {
        return res.status(400).send({status:'error',error:respuesta})
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