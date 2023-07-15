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
        
        if (!producto.title || !producto.description || !producto.code || !producto.price
            || !producto.status || !producto.stock || !producto.category){
                return "incomplete values";
            }

        if (isNaN(producto.price) || typeof(variable) == "boolean" || isNaN(producto.stock)){
                return "incorrect format";
            }
    
        if (productos.findIndex(product => product.code == producto.code) != -1){
            return "the code already exists"
        }

        var id_nuevo = 0;
    
        for (var i=0 ; i<productos.length ; i++) {
            
            if (id_nuevo == null || parseInt(productos[i]["id"]) > parseInt(id_nuevo))
            id_nuevo = productos[i]["id"];
        }
        
        producto['id'] = id_nuevo + 1;


        productos.push(producto);

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

        return 'Product created';
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



        for (let key in product) {
            products[productIndex][key] = product[key];
        }
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


