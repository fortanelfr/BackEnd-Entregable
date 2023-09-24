export default async function(req,res,next){
    try{
        if (req.session.role ===1){
            next()
        } else {
            return res.status(400).json({
                status:400,
                method: req.method,
                path: req.url,
                message: 'forbidden'
            })
        }
        
    }catch (error) { 
        next(error)
    }
}