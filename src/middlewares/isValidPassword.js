import { compareSync } from 'bcrypt'
import User from "../models/user.js"

export default async function (req,res,next) {
    try{
        let one = await User.findOne({mail:req.body.mail})
        
        let verified = compareSync(
            req.body.password,
            one.password
        )
        if (verified) {
            return next()
        }
        return res.status(401).json({
            success: false,
            message: 'error de autenticación!'
        })    
    } catch (error) {
        next(error)
    }
}