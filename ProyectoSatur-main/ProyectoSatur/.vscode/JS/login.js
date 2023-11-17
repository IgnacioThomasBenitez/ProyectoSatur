$(document).ready(function() {
    // on ready
});

async function LoginC(){

    try{
        
        let datos = {};

        datos.email = document.getElementById('EmailLogin').value;
        datos.password = document.getElementById('PassLogin').value;

        console.log(datos)

        const request = await fetch ('/HTML/api/loginC',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        const respuesta = await request.text();
        
        if (respuesta != 'FAIL'){
            console.log("todo bien")
            localStorage.tokenC = respuesta;
            localStorage.email = datos.email;
            localStorage.dni = datos.dni;
            window.location.href = "http://localhost:8080/Venta/index.html"
        }else{
            alert ("Nombre o password incorrectos");
            console.log("Nombre o password incorrectos")
        }

    }catch(error){
        console.log(error)
    }
}

async function LoginV(){

    try{
        
        let datos = {};
    
        datos.emailvendedor = document.getElementById('EmailLogin').value;
        datos.password = document.getElementById('PassLogin').value;
    
        console.log(datos)
    
        const request = await fetch ('/HTML/api/loginV',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        const respuesta = await request.text();

       

        if (respuesta != 'FAIL'){
            console.log("todo bien")
            localStorage.tokenV = respuesta;
            localStorage.email = datos.emailvendedor;
            localStorage.idV = datos.idvendedor;
            window.location.href = "http://localhost:8080/Venta/index.html"
        }else{
            alert ("Nombre o password incorrectos");
            console.log("Nombre o password incorrectos")
        }
    

        
    
    }catch(error){
        console.log(error)
    }
}


