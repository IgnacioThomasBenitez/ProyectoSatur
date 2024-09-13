$(document).ready(function() {
    // on ready
  });

  async function RistrarC(){

    try{

        let datos = {};

        datos.nombre = document.getElementById('Nombretxt').value;
        datos.apellido = document.getElementById('Apellidotxt').value;
        datos.dni = document.getElementById('Dnitxt').value;
        datos.fecha_n=  document.getElementById('FechaNtxt').value;
        datos.email = document.getElementById('Emailtxt').value;
        datos.telefono = document.getElementById('Telefonotxt').value;
        datos.password = document.getElementById('Contraseñatxt').value;
        
        let repetirpass = document.getElementById('ResContraseñatxt').value;

        if (repetirpass != datos.password){
            alert ("Las contraseñas no coididen");
            return
        }

        console.log(datos)

        const reques = await fetch ('/HTML/api/comprador',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })

        console.log("la cuenta fue creada con exito")

        let datos1 = {};
        datos1.email = datos.email;
        datos1.password = datos.password;
        console.log(datos1)

        const request = await fetch ('/HTML/api/loginC',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos1)
        })
        const respuesta = await request.text();

        if (respuesta != 'FAIL') {
            console.log("la cuenta fue logueada con exito")
            localStorage.tokenC = respuesta;
            localStorage.email = datos.email;
            localStorage.dni = datos.dni; // se guardara en el almacenamineto del esplorador
            window.location.href = 'http://localhost:8080/Venta/index.html'
        }

    }catch(error){
        console.log(error)
    }
  }

  async function RistrarV(){

    try{
        let datos = {};

        var checkbox = document.getElementById("check");
        
        if (checkbox.checked == true){
            var valorcheck = "si";
        }else{
            var valorcheck ="no"
        }


        datos.nombre_local = document.getElementById('NombreLocal').value;
        datos.emailvendedor = document.getElementById('EmailV').value;
        datos.direccion= document.getElementById('Direcciontxt').value;
        datos.telefono = document.getElementById('Telefonotxt').value;
        datos.password = document.getElementById('Passwordtxt').value;
        datos.soporteTecnico = valorcheck;
        
        let repetirpass = document.getElementById('ResPasswordtxt').value;

        if (repetirpass != datos.password){
            alert ("Las contraseñas no coididen");
            return
        }

        console.log(datos)

        const reques = await fetch ('/HTML/api/vendedor',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })

        console.log("la cuenta fue creada con exito")

        let datos1 = {};
        datos1.email_vendedor = datos.email_vendedor;
        datos1.password = datos.password;
        console.log(datos1)

        const request = await fetch ('/HTML/api/loginV',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos1)
        })
        const respuesta = await request.text();

        if (respuesta != 'FAIL') {
            console.log("la cuenta fue logueada con exito")
            localStorage.tokenV = respuesta;
            localStorage.email = datos.emailvendedor;
            localStorage.idV = datos.idvendedor; // se guardara en el almacenamineto del esplorador
           // window.location.href = 'http://localhost:8080/Venta/index.html'
        }


    }catch(error){
        console.log(error)
    }
  }