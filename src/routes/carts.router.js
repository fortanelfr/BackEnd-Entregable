import { Router } from "express";
import CartManager from '../managers/cartManager.js';

const router = Router();
const manager = new CartManager();


router.get("/",async (req,res)=>{
    try {
        let all = await manager.getCarts()
        return res.status(200).json({
                success:true,
                response:all
        })
    }
    catch (error) {
        next(error)
    }

})

router.get("/:cid",async (req,res)=>{
    
    let {cid} = req.params

    try {
        let all = await manager.getCartById(cid)
        return res.status(200).json({
                success:true,
                response:all
        })
    }
    catch (error) {
        next(error)
    }

})

router.post("/", async (req,res)=>{
    //Se crea un carrito vacio, lo unico que se calcula es su campo id y el campo products, el cual será un array vacio
    
    let one = await manager.addCart()
    if (one ==='Error'){
        return res.status(400).send({status:'error',error: respuesta})
    } else {
    return res.status(200).send({status:'success',message:'cart created'})
    }   
})

router.put("/:cid/product/:pid/:units", async (req,res)=>{

    let {cid,pid,units} = req.params

    let respuesta = await manager.addProductToCar(cid,pid,units)

    if(respuesta === "Cart has been updated"){
        return res.status(200).send({status:'success',message: respuesta})
    } else {
        return res.status(400).send({status:'error',error:respuesta})
    }
})




router.get("/bills/:cid", async (req,res)=>{
    try {
    let {cid} = req.params

    let respuesta = await manager.calculateBill(cid)

    res.status(200).json({
        success:true,
        response:respuesta
    })

    }catch(error){
        console.log(error)
    } 
})


router.delete("/:cid/product/:pid", async (req,res)=>{
    try{
        let {cid,pid} = req.params
        let cId_pId = await manager.deleteProduct(cid,pid)
        return res.status(200).json({
            success:true,
            response:cId_pId
    })
    } catch(error){
        console.log(error)
    } 
})

export default router;