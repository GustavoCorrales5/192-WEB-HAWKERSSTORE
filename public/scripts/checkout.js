var btnComprar = document.querySelectorAll('.checkout__comprar');
btnComprar.addEventListener('click', function(event){

    event.preventDefault();

    var promise = fetch('/checkout', { method: 'POST' });
    promise
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
           
        });


        
});