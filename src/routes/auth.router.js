import { Router } from "express";
import is_form_ok from "../middlewares/is_form_ok.js";
import is_8_char from "../middlewares/is_8_char.js";
import User from "../models/user.js";
import is_valid_user from "../middlewares/is_valid_user.js";

const router = Router();


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


router.post("/login", is_8_char,is_valid_user,async (req, res, next) => {
    try {
        req.session.mail = req.body.mail
        let one = await User.findOne({mail:req.session.mail})
        req.session.role = one.role
        console.log(req.body)
        return res.status(200).json({
            session: req.session,
            message: req.session.mail + ' inicio sesión'
       })
    } catch (error) {
        next(error)
    }
}) 


router.post("/signout",async (req, res, next) => {
    try {
        req.session.destroy()
        return res.status(200).json({
            success: true,
            message: 'session cerrada',
            dataSession:req.session
       })
    } catch (error) {
        next(error)
    }
}) 


export default router;