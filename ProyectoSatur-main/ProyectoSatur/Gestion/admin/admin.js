function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar));
}

function obtenerAlmacenamientoLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave));
    return datos;
}

let productos = obtenerAlmacenamientoLocal('productos') || [];
let mensaje = document.getElementById('mensaje');

document.getElementById("botonAñadir").addEventListener("click", function (event) {
    event.preventDefault();
    manejarProducto();
});

function manejarProducto(indice) {
    let productoAñadir = document.getElementById('productoAñadir').value;
    let descripcionAñadir = document.getElementById('descripcionAñadir').value;
    let valorAñadir = document.getElementById('valorAñadir').value;
    let existenciaAñadir = document.getElementById('existenciaAñadir').value;
    let imagenAñadir = document.getElementById('ImagenAñadir').value;

    if (productoAñadir === '' || descripcionAñadir === '' || valorAñadir === '' || existenciaAñadir === '' || imagenAñadir === '') {
        mensaje.classList.add('llenarCampos');
        setTimeout(() => { mensaje.classList.remove('llenarCampos'); }, 2500);
    } else {
        let van = true;
        for (let i = 0; i < productos.length; i++) {
            if (i !== indice && productos[i].nombre === productoAñadir) {
                mensaje.classList.add('repetidoError');
                setTimeout(() => { mensaje.classList.remove('repetidoError'); }, 2500);
                van = false;
            }
        }

        if (van) {
            if (indice !== undefined) {
                productos[indice] = {
                    nombre: productoAñadir,
                    descripcion: descripcionAñadir,
                    valor: valorAñadir,
                    existencia: existenciaAñadir,
                    urlImagen: imagenAñadir
                };
            } else {
                productos.push({
                    nombre: productoAñadir,
                    descripcion: descripcionAñadir,
                    valor: valorAñadir,
                    existencia: existenciaAñadir,
                    urlImagen: imagenAñadir
                });
            }

            mensaje.classList.add('realizado');
            setTimeout(() => {
                mensaje.classList.remove('repetidoError');
                window.location.reload();
            }, 1500);
            mostrarProductos();
            guardarAlmacenamientoLocal('productos', productos);
        }
    }
}

function eliminarProducto(indice) {
    productos.splice(indice, 1);
    mostrarProductos();
    guardarAlmacenamientoLocal('productos', productos);
}

function mostrarProductos() {
    let mostrarProductos = document.getElementById('mostrarProductos');
    mostrarProductos.innerHTML = '';

    for (let i = 0; i < productos.length; i++) {
        mostrarProductos.innerHTML +=
            `<div class="contenedorProductos">
                <img src="${productos[i].urlImagen}">
                <div class="informacion">
                    <p>${productos[i].nombre}</p>
                    <p>${productos[i].descripcion}</p>
                    <p class="precio"><span>Precio: $${productos[i].valor}</span></p>
                    Stock: ${productos[i].existencia}
                    <section>
                        <input class="button" type="button" value="Editar" onclick="editarProducto(${i})">
                        <input class="button" type="button" value="Eliminar" onclick="eliminarProducto(${i})">
                    </section>
                </div>
            </div>`;
    }
}

// Mostrar productos al cargar la página
window.addEventListener("load", () => {
    productos = obtenerAlmacenamientoLocal('productos') || [];
    mostrarProductos();
});
