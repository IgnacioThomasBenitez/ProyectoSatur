$(document).ready(function() {

    contenedor();
    $('#chau');
    cargarProductos();
  
});

function contenedor(){
    
    let contenedorProducto = '<table><thead><tr><th>IMAGEN</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Descripción</th><th>Editar</th><th>Delete</th></tr></thead><tbody></tbody></table';

    document.querySelector('#chau').outerHTML = contenedorProducto;
}

async function cargarProductos(){

    try{
        
        vendedor = localStorage.idV;

      const request = await fetch('api/generarProductos/' + vendedor, {
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        
        //headers: getHeaders()
        
      });
      const productos = await request.json();

      let us=productos

      console.log(productos)
      let listadoHTML = "";
      n = 0; // inicializar la variable global en 0 

      for(let producto of us) {

            let botonEliminar = '<button class="borra" onclick="eliminarAlumno('+ producto.id_producto+')">Eliminar</button>';
            let botonEditar = '<button class="edit" onclick="editarAlumno('+ producto.id_producto + ',\'tr' + n+'\')">Editar</button>'; //se agrego el ',\'tr' + n+'\' para agregar el argumento "tr n" y lo resiva el boton los dos parametros. 
            n++; // variable para que incremente 

            let productoHTML = `
            
                <tr id="tr${n}">
                    <td><img height="100px" width="100px" src="../images/${producto.img_producto}" alt=""></td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.descripcion}</td>
                    <td>${botonEditar}</td>
                    <td>${botonEliminar}</td>
                </tr>
            `;

            listadoHTML += productoHTML;
            
        }

        document.querySelector("#contenedor-informacion tbody").outerHTML = listadoHTML;
  
    }catch (error){
      console.log(error);
    }
  
}


// vamo a ver si funciona mandar el id por el Headers para traer los productos que tiene 
// ese vendedor y no todos los produtos en la base de datos 
function getHeaders(){ // incluye el token..
    return { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Vendedor': localStorage.token,
    }
}
