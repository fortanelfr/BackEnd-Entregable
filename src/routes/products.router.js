import { Router } from "express";
import ProductManager from '../managers/productManager.js';

const router = Router();
const manager = new ProductManager();


router.get("/",async (req,res,next)=>{
    try {
    let all = await manager.getProducts();


    return res.status(200).json({
        success:true,
        response:all
    })
    } catch (error) {
        next(error)
    }
})

router.get("/:pid",async (req,res)=>{
    
    let {pid} = req.params

    try{
        // Verificamos si el pid ingresado es un ObjectId valido, en caso contrario se notifica
        if (!pid.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success:false,
                response:"product id not valid"
            })
        }

        const producto = await manager.getProductById(pid);
    
        if(producto) {
            return res.status(200).json({
                success:true,
                response:producto
            })
        }
        
        return res.status(400).json({
            success:false,
            response:"product not found"
        })

    } catch (error) {
        next(error)
    }

})

router.post("/", async (req,res)=>{
    
    const respuesta = await manager.addProduct(req.body);

    if(respuesta === 'Product created'){
        return res.status(200).send({status:'success',message:respuesta}) 
    } else {
        return res.status(400).send({status:'error',error: respuesta})
    }          
})


router.put("/:id", async (req,res,next)=>{
    try {
        let {id} = req.params
        let data =  req.body
        let one = await manager.updateProduct(id,data)

        if(one ==="invalid fields"){
            return res.status(404).json({
                success:true,
                message:one
            })
        }

        if (one){
            return res.status(201).json({
                success:true,
                message:'product id: ' + one._id + ' modified'
            })

        }
        return res.status(404).json({
            success:false,
            message:'product id not found'
        })
        
        
    } catch (error) {
        next(error)
        
    }         
})


router.delete("/:id", async (req,res,next)=>{
    try {

        let {id} = req.params

        let one = await manager.deleteProduct(id);
        if (one) {
            return res.status(201).json({
                success:true,
                message:'product deleted'
            })
        } 
        return res.status(404).json({
            success:false,
            message:'product id not found'
        })
        
    } catch (error) {
        next(error)
        
    }         
})

export default router;