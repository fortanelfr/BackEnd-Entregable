import { model,Schema,Types } from "mongoose"

let collection = 'users'
let schema = new Schema({
            name:{ type:String,required:true},
            photo: {type:String,default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeRfV9n69zxuV4DQX7sYF7ql8ajx47wLioPeP-m4qFbHLkD9UNwfQSneRtkQEDnx-QxFs&usqp=CAU'},
            mail: {type:String,required:true,index:true,unique:true},
            age: {type:Number},
            role: {type:Number,default:0},
            password: {type:String,required:true}            
})

let User = model(collection,schema)
export default User