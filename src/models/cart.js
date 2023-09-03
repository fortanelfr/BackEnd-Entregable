import { model,Schema,Types } from "mongoose"

let collection = 'carts'
let schema = new Schema({
    products: 
        [{
            product_id:{ type:Types.ObjectId,required:true,ref:'product'},
            quantity: {type:Number,required:true}
            
        }]
        
    
})

let Cart = model(collection,schema)
export default Cart