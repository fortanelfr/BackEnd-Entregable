import { Router } from "express";
import is_form_ok from "../middlewares/is_form_ok.js";
import is_8_char from "../middlewares/is_8_char.js";
import User from "../models/user.js";
import is_valid_user from "../middlewares/is_valid_user.js";
import createHash from "../middlewares/createHash.js";
import isValidPassword from "../middlewares/isValidPassword.js";
import passport from "passport";
import create_token from "../middlewares/create_token.js";

const router = Router();


router.post("/register", is_form_ok, is_8_char,createHash,passport.authenticate('register',{ failureRedirect:'/api/auth/fail-register' }),async (req,res,next)=>{
    try {
        return res.status(201).json({
            success:true,
            message:'user registered',
            passport: req.session.passport,
            user_id:req.user._id
        })
    } catch (error) {
        next(error)
    }
})

router.get('/fail-register',(req,res)=> res.status(400).json({
    success: false,
    message: 'fail register!'
}))



router.post("/login", is_8_char,
                      passport.authenticate('login',{ failureRedirect:'/api/auth/fail-signin' }),
                      isValidPassword,
                      create_token,
                      async (req, res, next) => {
    try {
        req.session.mail = req.user.mail
        req.session.role = req.user.role

        
        return res.status(200).json({
            session: req.session,
            message: req.session.mail + ' inicio sesión',
            token: req.session.token
       })
    } catch (error) {
        next(error)
    }
})


router.get('/fail-signin',(req,res)=> res.status(400).json({
    success: false,
    message: 'fail sign in!'
}))



router.post("/signout",async (req, res, next) => {
    try {
        console.log(req.session)
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

router.get('/github',
    passport.authenticate('github',{ scope:['user:mail'] }), (req,res)=> {}
)


router.get('/github/callback',
    passport.authenticate('github',{ failureRedirect:'/fail-register' }),
    create_token,
        (req,res)=> {
            req.session.user = req.user
            /*
            return res.status(201).json({
                success: true,
                message: 'user created!',
                user: req.user,
                token: req.session.token
            })
            */
            
            res.redirect('http://localhost:8080/products/');
    }
)


export default router;