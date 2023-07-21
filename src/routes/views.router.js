import { Router } from "express";


const router = Router();




router.get("/",async (req,res)=>{
    let testUser = {
        name: 'fer',
        lastname: 'for'
    }
    res.render('index',testUser)
    

})


export default router;