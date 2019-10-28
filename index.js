//npx nodemon para iniciar el servidor
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');


const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;


//set handle bars 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const othersuff="hello there, this is other stuff";

//set handlebar rutas
app.get('/', function (req, res) {
    res.render('product',{
        stuff: othersuff
    });
});

app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT,()=>console.log('Server funcionando en el puerto '+PORT))