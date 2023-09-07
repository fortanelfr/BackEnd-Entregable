import { Router } from "express";
import ProductManager from '../managers/productManager.js';


const router = Router();
const manager = new ProductManager();




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


router.get("/new_product",async (req,res)=>{
    res.render('new_product')
})


router.get("/products",async (req,res)=>{
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


router.get("/products/:pid",async (req,res)=>{
    let {pid} = req.params


    let prod = await manager.getProductById(pid);
    
  

    res.render('home',
              {productos:prod})
    

})


router.get("/realTimeProducts",async (req,res)=>{

    res.render('realTimeProducts')
    

})

export default router;