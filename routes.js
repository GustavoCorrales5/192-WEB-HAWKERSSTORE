const assert = require('assert');
var hawkerslogo="./images/header_hawkerslogo.png";
var cartIcon="./images/header_cartIcon.png";
var  product= [
    {
        productNameLastName: "FUSION",
        productMainName: "NEBULA KIDS",
        glassImageDir:"/images/products/nebula_kids_p.png",
        caracImageDir:"/images/product_Caracteristics.png",
        productRecomendDir1:"/images/products/air_kids_r.png",
        productRecomendDir2:"/images/products/black_vegas_r.png",
        productRecomendDir3:"/images/products/crystal_green_r.png",

    }
]


function createRoutes (app, db) {


    //Cargando el home.html 
    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/public/index.html');

        // seleccionamos la colección que necesitamos
        const products = db.collection('products');

        // buscamos todos los productos
        products.find({})
            // transformamos el cursor a un arreglo
            .toArray((err, result) => {
                // asegurarnos de que noh ay error
                assert.equal(null, err);

                //
                console.log(result[0]);
            });

    });
    app.get('/product', function (req, res) {
        res.render('product');
    });

}

module.exports = createRoutes;