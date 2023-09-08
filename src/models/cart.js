import { model,Schema,Types } from "mongoose"

let collection = 'carts'
let schema = new Schema({
    products: 
        [{
            product_id:{ type:Types.ObjectId,required:true,ref:'products'},
            quantity: {type:Number,required:true}
            
        }]
        
    
})

schema.pre('find',function() {this.populate('products.product_id')})
let Cart = model(collection,schema)
export default Cart