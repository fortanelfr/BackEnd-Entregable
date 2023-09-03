import fs from 'fs';
import Product from "../models/product.js";
import { log } from 'console';
//definir la clase productmanager


export default class ProductManager {
    constructor(path) {
        this.path = path;
        //Defino el constructor "products"
        //va a tener un arreglo vacío => para que el listado de productos me apareza vacío
    }

/*
async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const productos = JSON.parse(data);
                return productos;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
}
*/
async getProducts() {
    try {
        let all = await Product.find()
        return all
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

        let product = await Product.findById(idProduct)
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
        let one = await Product.findByIdAndDelete(idProduct);
        return one

    } catch (error){
    
        console.log(error);
    }
}
}


