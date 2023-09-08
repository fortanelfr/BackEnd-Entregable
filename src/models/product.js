import { model,Schema } from "mongoose"

let collection = 'products'
let schema = new Schema({
    //Se creal index para title
    title: { type:String,required:true,index:true},
    description: { type:String,required:true},
    code: { type:Number,required:true,unique:true},
    price: { type:Number,required:true },
    status: { type:Number,default:0 },
    stock: {type:Number,default:0},
    category: {type:String,required:true}
})

let Product = model(collection,schema)
export default Product