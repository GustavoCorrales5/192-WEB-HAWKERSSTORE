const assert = require('assert');



var cartList = [];

function createRoutes (app, db) {
    
    
    //Cargando el home.html 
    app.get('/', (request, response) => {
        response.render('inicio');
    });
    
    app.post('/api/cartPorduct/:id', (request,response)=>{
        var id = request.params.id;
        
        var listCopy = cartList.slice();
        
        
        var index=listCopy.length;
        for(var c=0;c<listCopy.length;c++){
            if(request.params.id.toString()===listCopy[c]._id.toString()){
                cartList.splice(c,1);
            }
        }

        var price=0;
        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].price*listCopy[i].cantidad;
                
            }
        }

        response.send({
            totalCount: "TOTAL $"+price,
        });
        
        
        
    });
    
    app.post('/api/cartProductLess/:id', (request,response)=>{
        var id = request.params.id;
        
        var listCopy = cartList.slice();
        
        var indexProduct;
        
        for(var c=0;c<listCopy.length;c++){
            if(request.params.id.toString()===listCopy[c]._id.toString()){
                
                if(cartList[c].cantidad>1){
                    cartList[c].cantidad-=1;
                }else if(cartList[c].cantidad==1){
                    cartList.splice(c,1);
                }
                indexProduct=cartList[c].cantidad;
                
            }
        }
        
        var price=0;
        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].price*listCopy[i].cantidad;
                
            }
        }
        
        
        response.send({
            productQuantity: indexProduct,
            totalCount: "TOTAL $"+price,
        });
    });
    
    app.post('/api/cartProductMore/:id', (request,response)=>{
        var id = request.params.id;
        
        var listCopy = cartList.slice();
        
        var indexProduct;
        
        for(var c=0;c<listCopy.length;c++){
            if(request.params.id.toString()===listCopy[c]._id.toString()){
                cartList[c].cantidad+=1;
                indexProduct=cartList[c].cantidad;
                
                
            }
        }
        
        var price=0;
        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].price*listCopy[i].cantidad;
                
            }
        }
        
        
        response.send({
            productQuantity: indexProduct,
            totalCount: "TOTAL $"+price,
        });
    });
    
    app.post('/api/cart/:id', (request, response) => {
        var id = request.params.id;
        const products = db.collection('products');
        var query= {};        
        
        var esId=false;
        var cont=1;
        var encuentraComun=false;
        
        products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que noh ay error
            
            //
            
            var c=0;
            for(c;c<result.length;c++){
                if(request.params.id.toString()===result[c]._id.toString()){
                    esId=true;  
                    for(var i=0;i<cartList.length;i++){
                        
                        if (request.params.id.toString()===cartList[i]._id.toString()){
                            
                            encuentraComun=true;
                            
                            
                            
                        } else{
                            
                        }
                    }
                    if(encuentraComun==true){
                        cartList[c].cantidad+=1;
                    }else{
                        result[c].cantidad=cont;
                        cartList.push(result[c]);
                    }
                    
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
        var cantidad2=0;
        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].price*listCopy[i].cantidad;
                
            }
        }
        
        const context={
            products:listCopy,
            total:price,
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