import fs from 'fs';
//definir la clase productmanager


export default class ProductManager {
    constructor(path) {
        this.path = path;
        //Defino el constructor "products"
        //va a tener un arreglo vacío => para que el listado de productos me apareza vacío
    }

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


addProduct = async (producto) => {
    try {
        const productos = await this.getProducts();


        if (productos.length === 0) {
            producto.id = 1;
        } else {
            producto.id = productos[productos.length - 1].id + 1;
        }
       


        productos.push(producto);

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

        return producto;
    } catch (error) {
        console.log(error);
    }
}


getProductById = async (idProduct) =>{

    try {
    const products = await this.getProducts();
    const productIndex = products.findIndex(product => product.id === idProduct); 

    if (productIndex === -1){
        return "Not found";
    }

    const product = products [productIndex];
    return product;

    } catch (error){
        console.log(error);
    }
}

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
}


