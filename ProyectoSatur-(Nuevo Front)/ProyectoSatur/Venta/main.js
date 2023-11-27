let productos = [];
let productoSeleccionado = null; // Agregué esta línea para definir la variable productoSeleccionado


fetch("productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
console.log(tituloPrincipal)
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const searchInput = document.getElementById("searchInput");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

// Función para cargar productos en el contenedor
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <div class="boton-modal" data-producto-id="${producto.id}"><label for="btn-modal">Informacion</label></div>
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <h5 class="producto-titulo">${producto.descripcion}</h5> 
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        </div>`;

        contenedorProductos.append(div);
    });

    // Actualizar botones de agregar y agregar evento clic a los botones de información
    actualizarBotonesAgregar();

    const botonesInformacion = document.querySelectorAll('.boton-modal');
    botonesInformacion.forEach(boton => {
        boton.addEventListener('click', () => {
            const productoId = boton.dataset.productoId;
            productoSeleccionado = productos.find(producto => producto.id === productoId);
            mostrarInformacionProducto();
        });
    });

}
function mostrarInformacionProducto() {
    if (productoSeleccionado) {
        // Verificar si ya hay un modal existente y eliminarlo
        const modalExistente = document.querySelector(".miPopup");
        if (modalExistente) {
            modalExistente.remove();
        }

        // Crear un nuevo modal
        const nuevoModal = document.createElement("div");
        nuevoModal.classList.add("miPopup", "container-modal");
        nuevoModal.innerHTML = `
            <div class="content-modal">
                <h2>${productoSeleccionado.titulo}</h2>
                <img class="img" src="${productoSeleccionado.imagen}" id="${productoSeleccionado.id}" alt="${productoSeleccionado.titulo}">
                <p>${productoSeleccionado.info}</p>
                <div class="btn-cerrar" onclick="cerrarModal()">
                <label for="btn-modal">Cerrar</label>
            </div>
        `;

        // Agregar el nuevo modal al cuerpo del documento
        document.body.appendChild(nuevoModal);

        // Mostrar el modal
        nuevoModal.style.display = "block";

        // Asignar una función para cerrar el modal
        window.cerrarModal = function () {
            nuevoModal.style.display = "none";
            nuevoModal.remove(); // Eliminar el modal del DOM
            window.cerrarModal = null; // Eliminar la función cerrarModal del ámbito global
        };
    }
}



// function mostrarInformacionProducto() {
//     if (productoSeleccionado) {
//         // Puedes mostrar la información en un popup utilizando alert
//         alert("Información del producto seleccionado:\n" + JSON.stringify(productoSeleccionado));

//         // Limpiar la variable de producto seleccionado después de mostrar la información
//         productoSeleccionado = null;
//     }
// }



botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        console.log(e)

        if (e.currentTarget.id != "todos") {

            console.log(e.currentTarget.id)

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            console.log(productoCategoria.categoria.nombre)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    // Obtener el ID del botón que activó el evento
    const idBoton = e.currentTarget.id;

    // Verificar si el producto ya está en el carrito
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        // Mostrar un mensaje indicando que el producto ya está en el carrito
        mostrarMensaje("Tu producto ya está en el carrito");
        return;
    } else {
        // Mostrar un mensaje indicando que el producto fue agregado al carrito
        mostrarMensaje("Producto agregado");
    }

    // Encontrar el producto correspondiente al ID del botón
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    // Establecer la cantidad del producto a 1 y agregarlo al carrito
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);

    // Actualizar el contador del carrito y almacenar en el almacenamiento local
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function mostrarMensaje(mensaje) {
    // Mostrar un mensaje Toastify con el texto proporcionado
    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravedad: "arriba",
        posición: "derecha",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
        },
        onClick: function () { }
    }).showToast();
}


function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

const handleSearch = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const productosElegidos = productos.filter((producto) => producto.titulo.toLowerCase().startsWith(searchTerm));
    cargarProductos(productosElegidos);
};

cargarProductos(productos);

searchInput.addEventListener("input", handleSearch);