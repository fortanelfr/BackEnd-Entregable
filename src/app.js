import express from 'express';
import handlebars from 'express-handlebars';
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js'

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products',productRouter);
app.use('/api/carts',cartRouter);
app.use('/',viewsRouter);

app.listen(8080,() => console.log('Levantando el puerto 8080'))