window.addEventListener('load', function(){

    var btnsAdd = document.querySelectorAll('.product__delete');
    var total = document.querySelector('.cart__total');


    btnsAdd.forEach(function (btn) {
        
        btn.addEventListener('click', function(event){
            event.preventDefault();
            var id = btn.getAttribute('data-name');

            console.log("hola bb");
            var promise = fetch('/api/cartPorduct/' + id, { method: 'POST' });
            promise
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    total.innerHTML=data.totalCount;
                });

                window.location.reload();

        });

    });

  

});

