import { Router } from "express";
import ProductManager from '../managers/productManager.js';
import CartManager from '../managers/cartManager.js';


const router = Router();
const manager = new ProductManager();
const cartManager = new CartManager();




router.get("/",async (req,res)=>{
    let productos = await manager.getProducts();

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

router.get("/register",async (req,res)=>{
    res.render('register')
})

router.get("/login",async (req,res)=>{
    res.render('login')
})


router.get("/products",async (req,res)=>{
    let productos = await manager.getProducts();


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

router.get("/carts",async (req,res)=>{
    let {pid} = req.params


    let prod = await cartManager.getCarts();
  
    
    
    console.log(prod[0])

    res.render('homeCart',
              {productos:prod[0]})
    

})


router.get("/realTimeProducts",async (req,res)=>{

    res.render('realTimeProducts')
    

})

export default router;