


var nav = document.querySelector('.header');
console.log(window.pageYOffset);

if(window.pageYOffset <= 0){
    nav.classList.add('header--position');
} else if(window.pageYOffset >=0){
    nav.classList.remove>('header--position');
}

