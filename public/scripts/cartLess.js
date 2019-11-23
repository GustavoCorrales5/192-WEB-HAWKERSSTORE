window.addEventListener('load', function(){

var btnsLess = document.querySelectorAll('.buttons__-');
var productCount = document.querySelector('.quantity__number');

var total = document.querySelector('.cart__total');


btnsLess.forEach(function (btn) {

    btn.addEventListener('click', function(event){

        event.preventDefault();
        var id = btn.getAttribute('data-name');

        var promise = fetch('/api/cartProductLess/' + id, { method: 'POST' });
        promise
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                productCount.innerText = data.productQuantity;
                total.innerHTML=data.totalCount;
            });

    });

});

});