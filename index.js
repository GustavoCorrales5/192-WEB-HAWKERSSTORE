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



var hawkerslogo="./images/header_hawkerslogo.png";
var cartIcon="./images/header_cartIcon.png";

var  product= [
    {
        productNameLastName: "FUSION",
        productMainName: "NEBULA KIDS",
        glassImageDir:"./images/products/nebula_kids_p.png",
        caracImageDir:"./images/product_Caracteristics.png",
        productRecomendDir1:"./images/products/air_kids_r.png",
        productRecomendDir2:"./images/products/black_vegas_r.png",
        productRecomendDir3:"./images/products/crystal_green_r.png",



     
    }
]



//set handlebar rutas
app.get('/', function (req, res) {
    res.render('product',{
        hawkerslogo: hawkerslogo, 
        cartIcon:cartIcon,
        productMainName:product[0].productMainName,
        productNameLastName:product[0].productNameLastName,
        glassImageDir:product[0].glassImageDir,
        caracImageDir:product[0].caracImageDir,
        productRecomendDir1:product[0].productRecomendDir1,
        productRecomendDir2:product[0].productRecomendDir2,
        productRecomendDir3:product[0].productRecomendDir3

    });
});

app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT,()=>console.log('Server funcionando en el puerto '+PORT))