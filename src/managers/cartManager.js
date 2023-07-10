import fs from 'fs';
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


addCart = async (carrito) => {
    try {
        const carritos = await this.getCarts();


        if (carritos.length === 0) {
            carrito.id = 1;
        } else {
            carrito.id = carritos[carritos.length - 1].id + 1;
        }
       


        carritos.push(carrito);

        await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, '\t'));

        return "Cart added";
    } catch (error) {
        console.log(error);
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

    try {
    const carts = await this.getCarts();
    const cartsIndex = carts.findIndex(cart => cart.id === idCart); 

    if (cartsIndex === -1){
        return "Cart not found";
    } else {
        const productIndex = carts[cartsIndex].products.findIndex(product => product.idProduct === idProduct); 
        if(productIndex ===1){//Si el producto existe

            carts[cartsIndex].products[productIndex].quantity = quantity;
        } else {
            carts[cartsIndex].products.push({idProduct,quantity});
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


