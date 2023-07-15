import fs from 'fs';
import ProductManager from './productManager.js';
//definir la clase CartManager


export default class CartManager {
    constructor(path) {
        this.path = path;
        
        //Defino el constructor "products"
        //va a tener un arreglo vacío => para que el listado de productos me apareza vacío
    }



async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const carritos = JSON.parse(data);
                return carritos;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
}


addCart = async () => {
    try {
        const carritos = await this.getCarts();
        
        var id_nuevo = 0;
        
        for (var i=0 ; i<carritos.length ; i++) {
            
            if (id_nuevo == null || parseInt(carritos[i]["id"]) > parseInt(id_nuevo))
            id_nuevo = carritos[i]["id"];
        }
        
       id_nuevo = id_nuevo + 1;
       
        carritos.push({"id":id_nuevo,"products":[]});

        await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, '\t'));

        return "Cart added";
    } catch (error) {
        console.log(error);
        return "Error"
    }
}


getCartById = async (idCart) =>{

    try {
    const carts = await this.getCarts();
    const cartsIndex = carts.findIndex(cart => cart.id === idCart); 

    if (cartsIndex === -1){
        return "Not found";
    }

    const cart = carts [cartsIndex];
    return cart.products;//La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.

    } catch (error){
        console.log(error);
    }
}


addProductToCar = async (idCart,idProduct,quantity) =>{

    const manager = new ProductManager("./src/files/products.json");


    try {
    const carts = await this.getCarts();
    const cartsIndex = carts.findIndex(cart => cart.id === idCart); 

    if (cartsIndex === -1){
        return "Cart not found";
    } else {
        const productIndex = carts[cartsIndex].products.findIndex(product => product.idProduct === idProduct); 
        if(productIndex != -1){//Si el producto ya se encuentra en products
            console.log(carts[cartsIndex].products)
            carts[cartsIndex].products[productIndex].quantity = quantity;
        
        } else if (await manager.getProductById(idProduct) != 'Not found') { // Si el producto no está en la lista y existe en el catalogo de productos
            carts[cartsIndex].products.push({idProduct,quantity});
        } else { // Si el producto no existe en el catalogo
            return "Product not found";
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return "Cart has been updated";

    }

    } catch (error){
        console.log(error);
    }
}


/*
updateProduct = async (idProduct,product) =>{

    try {
    const products = await this.getProducts();
    const productIndex = products.findIndex(product => product.id === idProduct); 

    if (productIndex === -1){
        return "Not found";
    } else {
        products[productIndex] = {id:idProduct, ...product}
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return "Product updated";
    }

    } catch (error){
        console.log(error);
    }
}


deleteProduct = async (idProduct) =>{

    try {
    const products = await this.getProducts();
    const productIndex = products.findIndex(product => product.id === idProduct); 

    if (productIndex === -1){
        return "Not found";
    }
    
    //Filtramos el id que deseamos eliminar
    const newProducts = products.filter(products => products.id != idProduct); 
  


    //Sobreescribimos el json
    await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, '\t'));

    return "User deleted"

    } catch (error){
        console.log(error);
    }
}
*/
}


