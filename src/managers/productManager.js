import Product from "../models/product.js";
import { log } from 'console';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
//definir la clase productmanager


export default class ProductManager {
    constructor() {
    }

async getProducts(word=null,page=null) {
    try {
        if(page === null){
           let page = 1
        }
        
        let limit = 6
        //En caso de que se quiera filtar por algun texto
        if(word === null){
            let all = await Product.find()
                .skip(page && (page-1)*limit)  	
                .limit(limit).lean()
            return all
        } else {
            let all = await Product.find({title:{$regex:word}})
                                        .skip(page && (page-1)*limit)  	
                                        .limit(limit).lean()
            return all
        }
    } catch (error) {
        return error
    }
}



addProduct = async (producto) => {
    try {

        if (!producto.title || !producto.description || !producto.code || !producto.price
            || !producto.status || !producto.stock || !producto.category){
                return "incomplete values";
            }

        if (isNaN(producto.price) || typeof(variable) == "boolean" || isNaN(producto.stock)){
                return "incorrect format";
            }


        let one = await Product.create(producto)
        console.log(one)
        return 'Product created'
    } catch (error) {
        if (error.message.includes('E11000')){
            return "the code already exists"
        }
        console.log(error);
    }
}


getProductById = async (idProduct) =>{

    try {

        var mongoose = require('mongoose');
        var idProduct = new mongoose.Types.ObjectId(idProduct.trim());

        let product = await Product.find({_id:idProduct}).lean()
        return product

    } catch (error) {
        return error
    }


}

updateProduct = async (idProduct,product) =>{

    try {
    const params = Object.keys(product) // req.body is the updates coming from API
    const allowedMethods = ["title", "description","code","price","status","stock","category"];
    const isValidOperation = params.every((param) => allowedMethods.includes(param));

    if (!isValidOperation) {
        return "invalid fields";
    }
    

    let one = await Product.findByIdAndUpdate(idProduct,product,{new:true})
    return one

    } catch (error){
        console.log(error);
    }
}


deleteProduct = async (idProduct) =>{

    try {
        var mongoose = require('mongoose');
        var idProduct = new mongoose.Types.ObjectId(idProduct.trim());

        let one = await Product.findByIdAndDelete(idProduct);
        return one

    } catch (error){
    
        console.log(error);
    }
}
}


