import ProductManager from './manager/productManager.js';

const manager = new ProductManager('./files/products.json');

const env = async () => {
    const productos = await manager.getProducts();
    console.log(productos);
     

     const producto = 
     {
        title: 'caja_6',
        descripcion: 'carton',
        price: '80',
        thumbnail: '...',
        code: '1231',
        stock: '6'
     };



    
    await manager.addProduct(producto);
    const productsResult = await manager.getProducts();
    //const productResult = await manager.getProductById(3);
    //const deleteProduct = await manager.deleteProduct(4);

    console.log(productsResult);
    console.log("El producto del id seleccionado es:");
    console.log(productResult);
    //console.log("Al eliminar el producto del id 6 obtenemos esto");
    //console.log(deleteProduct);
}

env()