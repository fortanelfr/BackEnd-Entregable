//definir la clase productmanager

class ProductManager{
    constructor() {
        this.products = [];
        //Defino el constructor "products"
        //va a tener un arreglo vacío => para que el listado de productos me apareza vacío
    }


// Debe contar con un método que retorne nuestro arreglo de productos.
getProducts = () => {
    return this.products;
}

// Para poder almacenar los productos en nuestro arreglo, debemos pasarle ciertos parámetros.

addProduct = (title, description, price, thumbnail,code,stock) => {
    const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        products: [] //nos pedía el elemento "products" con array vacío
    }

    if (this.products.length === 0){
        product.id = 1
    } else {
        product.id = this.products [this.products.length-1 ].id + 1
    }

    //pusheamos el producto
    this.products.push(product)
}

 //Debe contar con el método getProductById, el cual recibe como parámetro el
//id del producto

getProductById = (idProduct) =>{
    const productIndex = this.products.findIndex(product => product.id === idProduct); 

    if (productIndex === -1){
        console.log("Not found");
        return;
    }

    const productAdd = this.products [productIndex].products.includes(idProduct);

    if (productAdd){
        console.log ("El producto se agregó correctamente");
        return;
    }
    this.products[productIndex].products.push(idProduct)
}
};

const manejadorProductos = new ProductManager ();
manejadorProductos.addProduct ('Regla', 'transparente', 80, 'sin imágen', 'ab154', 36 );
manejadorProductos.addProduct ('Lápiz', 'transparente', 100, 'sin imágen', 'ab155', 30 );
manejadorProductos.addProduct ('Birome', 'transparente', 200, 'sin imágen', 'ab156', 15 );

manejadorProductos.getProductById(1);
manejadorProductos.getProductById(2);
manejadorProductos.getProductById(3);


console.log(manejadorProductos.getProducts());