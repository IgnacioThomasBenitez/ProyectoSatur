$(document).ready(function() {

    cargarPerfil()
    $('#contenedor-productos');
  
});

const contenedorProductos = document.querySelector("#contenedor-productos");


async function cargarPerfil(){

    try{

        let dni = localStorage.dni

        const request = await fetch('api/UserComprador/' + dni, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            
            //headers: getHeaders()
            
        });
        const per = await request.json();

        console.log(per)
        let us = [per];

        /*if(perfil.status >= 400){
            alert("Error inesperado")
            return
        }*/

        //if(perfil.status >=200 && perfil.status <= 400){
            contenedorProductos.innerHTML = "";
            for (let perfil of us) {

                const div = document.createElement("div");
                div.classList.add("producto");
                div.innerHTML = `
                    
                    <header class="perfil">
                    <img src="" alt>
                    <div class="title">
                        <center>
                        <h1>${perfil.nombre}</h1>
                        </center>
                        <center>
                        <h2>${perfil.apellido}</h2>
                        </center>
                    </div>
                    </header>
                    <div class="container-projetos">
                    <div class="div">
                        <div class="datos">
                        <h3>Fecha de nacimiento:<p>${perfil.fecha_n}</p>
                        </h3>
                        <h3>Telefono:<p>${perfil.telefono}</p>
                        </h3>
                        </div>
                        <div class="datos">
                        <h3>Edad:<p>${perfil.apellido}</p>
                        </h3>
                        <h3>Email:<p>${perfil.email}</p>
                        </h3>
                        </div>
                        <div>
                        <h3>Localidad:<p></p>
                        </h3>
                        </div>
                    </div>
                    </div>
                
                `;
                contenedorProductos.append(div);
                

            }
            
            //document.querySelector('#Alumnos tbody').outerHTML = listadoHTML; //modifica la tabla de alumnos


        //}



    }catch(error){
        console.error(error)
    }
}