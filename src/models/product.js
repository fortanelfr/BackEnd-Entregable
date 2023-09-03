import { model,Schema } from "mongoose"

let collection = 'products'
let schema = new Schema({
    title: { type:String,required:true },
    description: { type:String,required:true},
    code: { type:String,required:true,unique:true},
    price: { type:String,required:true },
    status: { type:Number,default:0 },
    stock: {type:Number,default:0},
    category: {type:String,required:true}
})

let Product = model(collection,schema)
export default Product