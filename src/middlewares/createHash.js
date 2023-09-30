import { hashSync,genSaltSync } from 'bcrypt'

export default function (req,res,next) {
    try{
        req.body.password = hashSync(
            req.body.password,
            genSaltSync(10)
        )
        return next()

    } catch (error) {
        next(error)
    }
}