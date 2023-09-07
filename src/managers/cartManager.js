import ProductManager from './productManager.js';
import Cart from "../models/cart.js";


const manager = new ProductManager();


export default class CartManager {
    constructor() {
    }



async getCarts() {
        try {
            let all = await Cart.find()
            return all
        } catch (error) {
            console.log(error);
        }
}


addCart = async () => {
    try {
        let one = await Cart.create([null])
        return one
    } catch (error) {
        console.log(error);
        return "Error"
    }
}


getCartById = async (idCart) =>{

    try {
        let one = await Cart.find({_id:idCart})
        return one
    } catch (error){
        console.log(error);
    }
}


addProductToCar = async (idCart,idProduct,quantity) =>{
    try {

        let cartID = await Cart.find({_id:idCart})
        if (cartID.length == 0){
            return "Cart not found"
        }

        let productID = await manager.getProductById(idProduct)
        if (productID === null){
            return "Product not found"
        }
        
         
        let cId_pId = await Cart.find({_id:idCart,'products.product_id':idProduct})
        //Si el producto no se encuentra en el carrito 
        if (cId_pId.length == 0){
            let one = await Cart.findOneAndUpdate({_id:idCart},
                {"$push": {products:{
                                  product_id:idProduct,
                                  quantity:quantity
                }}},
                 {new : true, upsert: true }
                )
            return "Cart has been updated"
        } else {// En caso de que el producto ya se encuentre en el carrito
            let one = await Cart.updateOne({_id:idCart,'products.product_id':idProduct},
                                   {$set: { 'products.$.quantity': quantity}, },
                                   {new : true})
            return "Cart has been updated"
        }

    } catch (error){
        console.log(error);
    }
}



deleteProduct = async (idCart,idProduct) =>{

    try {
        let cId_pId = await Cart.find({_id:idCart,'products.product_id':idProduct})
        //Si el producto o el carro no se encuentran en la lista
        if (cId_pId.length == 0){
            return "Cart or Product not found"
        } else {// En caso de que el producto ya se encuentre en el carrito
            let one = await Cart.updateOne({_id:idCart},
                                        {$pull: {products:{product_id:idProduct}}})
            return "Cart has been updated"
        }

    } catch (error){
        console.log(error);
    }
}

}


