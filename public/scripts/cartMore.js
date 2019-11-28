window.addEventListener('load', function(){
    
    var btnsLess = document.querySelectorAll('.buttons__plus');
    var productCount = document.querySelector('.quantity__number');
    var total = document.querySelector('.cart__total');

    btnsLess.forEach(function (btn) {
        
        btn.addEventListener('click', function(event){
            
            console.log("hi bb estoy aqui");
            event.preventDefault();
            var id = btn.getAttribute('data-name');
            
            var promise = fetch('/api/cartProductMore/' + id, { method: 'POST' });
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
            window.location.reload();

        });
        
    });
    
});