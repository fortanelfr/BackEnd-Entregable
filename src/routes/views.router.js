import { Router } from "express";
import ProductManager from '../managers/productManager.js';


const router = Router();
const manager = new ProductManager("./src/files/products.json");




router.get("/",async (req,res)=>{
    let productos = await manager.getProducts();

    console.log(productos)

    let testUser = {
        name: 'fer',
        lastname: 'for'
    }

    res.render('home',
    {user:testUser,
     productos})
    

})


router.get("/realTimeProducts",async (req,res)=>{

    res.render('realTimeProducts')
    

})

export default router;