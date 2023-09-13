import { Router } from "express";
import ProductManager from '../managers/productManager.js';
import is_form_ok from "../middlewares/is_form_ok.js";
import is_8_char from "../middlewares/is_8_char.js";
import User from "../models/user.js";

const router = Router();
const manager = new ProductManager();


router.post("/register", is_form_ok, is_8_char,async (req,res,next)=>{
    try {
        let one = await User.create(req.body)
        return res.status(201).json({
            success:true,
            message:'user registered',
            user_id:one._id
        })
    } catch (error) {
        next(error)
    }
})


export default router;