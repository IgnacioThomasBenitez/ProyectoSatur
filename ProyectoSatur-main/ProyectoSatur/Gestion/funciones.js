$(document).ready(function() {

    Traerimagenes();
     $('#foto');
     TraerProducto();
});

async function Traerimagenes(){
    try{

        const request = await fetch('/Gestion/api/generarImagen', {
          method: 'GET',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        });
        const fotos = await request.json();
    
        console.log(fotos)
        let listadoHTML = '';
        for (let foto of fotos) {
    
          //  le damos un id al tr y le ponemos la variable incremental para que los "tr" tengan distinto numero
          let fotoHTML = '<img height="100px" width="100px" src="../images/'+ foto.imagen +'" alt="">'; // cheto, se muestra la imagen 😎
    
          listadoHTML += fotoHTML;
    
        }
          
        document.querySelector('#foto div').outerHTML = listadoHTML; //modifica la tabla de alumnos
        
    
      }catch (error){
        console.log(error);
      }
    
    
}

async function TraerProducto(){
    try{

        const request = await fetch('/Gestion/api/generarProductos', {
          method: 'GET',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        });
        const productos = await request.json();
    
        console.log(productos)
        let listadoHTML = '';
        for (let producto of productos) {
    
            let productoHTML = '<tr><td>'+producto.nombre+'</td><td> '+producto.descripcion+'</td><td>'
            +producto.precio +'</td><td>'+producto.stock+'</td><td>'+producto["categoria"].categoria+
            '</td><td>'+producto["vendedor"].idvendedor+'</td><td><img height="100px" width="100px" src="../images/'+producto.img_producto+'" alt=""></td></tr>';
            
            //console.log(producto["vendedor"].emailvendedor) // forma de agarrar un json dentro de otro json 
            //console.log(producto["categoria"].categoria) // forma de agarrar un json dentro de otro json 
          listadoHTML += productoHTML;
    
        }
          
        document.querySelector('#Productos tbody').outerHTML = listadoHTML; //modifica la tabla de alumnos
        
    
      }catch (error){
        console.log(error);
      }
    
    
}