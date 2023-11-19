
function loginC(){

    window.location.href = "http://localhost:8080/HTML/ingresar.html"
}

function loginV(){

    window.location.href = "http://localhost:8080/HTML/ingresarVendedor.html"
}

function incio(){

    window.location.href = "http://localhost:8080/Venta/index.html"
}

const $btnSignIn= document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),
      $signUp = document.querySelector('.sign-up'),
      $signIn  = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active')
    }
});

