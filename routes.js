const assert = require('assert');



var cartList = [];

function createRoutes (app, db) {
    
    
    //Cargando el home.html 
    app.get('/', (request, response) => {
        response.render('inicio');
    });
    
    
    app.post('/api/cart/:id', (request, response) => {
        var id = request.params.id;
        const products = db.collection('products');
        var query= {};        
        
        var esId=false;
        products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que noh ay error
            
            //
            
            var c=0;
            var cont=0;
            for(c;c<result.length;c++){
                if(request.params.id.toString()===result[c]._id.toString()){
                    esId=true;         
                    cartList.push(result[c]);
                    
                    cont+=1;
                } 
            }
            
            if(!esId){
                response.send({
                    message: 'error',
                    cartLength: cartList.length
                });
                return;
            }
            
            
            
            response.send({
                cartLength: cartList.length
            });
            
        });
        
        
        
    });
    
    //BUSCO UN PRODUCTO EN BASE A SU ID EN LA BASE DE DATOS Y CARGO EL HANDLEBARS CON SU INFORMACION 
    app.get('/product/:id', function (req, res) {
        const products = db.collection('products');
        var query= {};        
        products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que noh ay error
            
            //
            var c=0;
            for(c;c<result.length;c++){
                if(req.params.id.toString()===result[c]._id.toString()){
                    result[c].cartLength= cartList.length,
                    res.render('product', result[c]);
                }
                
            }
            
            
        });
        
    });
    
    
    app.get('/nuevaColeccion', function (req, res) {
        
        const products = db.collection('products');
        products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que noh ay error
            
            
            var listCopy = result.slice();
            
            
            if(req.query.orderType == 'precio'){
                listCopy.sort(function(a, b){
                    return a.price - b.price;
                });
            }
            
            
            if(req.query.orderType == 'novedad'){
                listCopy.sort(function(a, b){
                    return a.date - b.date;
                });
            }
            
            
            if(req.query.orderType == 'popularidad'){
                listCopy.sort(function(a, b){
                    return a.popularity - b.popularity;
                });
            }
            
            if(req.query.filter == 'naranja'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.colorLente==="naranja"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            if(req.query.filter == 'verde'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.colorLente==="verde"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            if(req.query.filter == 'rojo'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.colorLente==="rojo"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            if(req.query.filter == 'rosa'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.colorLente==="rosa"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            if(req.query.filter == 'azul'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.colorLente==="azul"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            if(req.query.filter == 'negro'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.colorLente==="negro"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            if(req.query.filter == 'gris'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.colorLente==="gris"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            if(req.query.filter == 'circular'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.tipoDeMarco==="circular"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            
            if(req.query.filter == 'cuadrado'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.tipoDeMarco==="cuadrado"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            
            if(req.query.filter == 'semi-circular'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.tipoDeMarco==="semi-circular"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            if(req.query.filter == '300'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.uvProtection==400){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            if(req.query.filter == '100'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.uvProtection>=100 && elem.uvProtection<400){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            
            for(var i=0;i<listCopy.length;i++){
                listCopy[i]._id=listCopy[i]._id.toString();
            }
            
            const context={
                products:listCopy,
                cartLength: cartList.length,
                
                
            }
            res.render('store',context);
            
        });
        
    });
    
    app.get('/carro', function (req, res) {
        
        
        var listCopy = cartList.slice();
        var price=0;
        var cantidad=0;
        for(var i=0;i<listCopy.length;i++){
            price+=listCopy[i].price;
            
        }
        
        for(var i=0;i<listCopy.length;i++){
            
            console.log(listCopy[i]._id.toString());
            if(listCopy[i+1]!=null){
                if(listCopy[i]._id.toString()===listCopy[i+1]._id.toString()){
                    cantidad+=1;
                    console.log(cantidad);
                }
            }
        }
        
        const context={
            products:listCopy,
            total:price,
            cant:cantidad,
            
            
        }
        
        
        res.render('cart',context);
        
    });
    
    app.get('/checkout', function (req, res) {
        const products = db.collection('products');
        var query= {};        
        
      
        res.render('checkout');
        
        
        
        
        
        
        
    });
    
    
    
}

module.exports = createRoutes;