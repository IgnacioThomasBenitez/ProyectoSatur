let productos = [];

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




botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <div class="boton-modal"><label for="btn-modal">Informacion</label></div>
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <h5 class="producto-titulo">${producto.descripcion}</h5> 
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
            <input type="checkbox" id="btn-modal">
            <div class="container-modal">
                <div class="content-modal">
                    <h2>Aqui tienes toda la informacion del producto seleccionado</h2>
                    <p>
                    <img class="img" src="${producto.imagen}" id="${producto.id}" alt="${producto.titulo}">
                    ${producto.info}
                    </p>
                <div class="btn-cerrar">
                <label for="btn-modal">Cerrar</label>
            </div>
        </div>
        <label for="btn-modal" class="cerrar-modal"></label>
        </div>
        </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}



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
    const idBoton = e.currentTarget.id;

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        // El producto ya está en el carrito
        Toastify({
            text: "Tu producto ya esta en el carrito",
            duration: 3000,
            close: true,
            gravedad: "arriba", // `arriba` o `abajo`
            posición: "derecha", // `izquierda`, `centro` o `derecha`
            stopOnFocus: true, // Evita que se descarte el brindis al pasar el mouse por encima
            style: {
                background: "linear-gradient(to right, #4b33a8, #785ce9)",
                borderRadius: "2rem",
                textTransform: "uppercase",
                fontSize: ".75rem"
            },
            offset: {
                x: '1.5rem', // eje horizontal: puede ser un número o una cadena que indique la unidad. por ejemplo: '2em'
                y: '1.5rem' // eje vertical: puede ser un número o una cadena que indique la unidad. por ejemplo: '2em'
            },
            onClick: function () {} // Callback after click
        }).showToast();
        return
    }
    else {
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravedad: "arriba", // `arriba` o `abajo`
        posición: "derecha", // `izquierda`, `centro` o `derecha`
        stopOnFocus: true, // Evita que se descarte el brindis al pasar el mouse por encima
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // eje horizontal: puede ser un número o una cadena que indique la unidad. por ejemplo: '2em'
            y: '1.5rem' // eje vertical: puede ser un número o una cadena que indique la unidad. por ejemplo: '2em'
        },
        onClick: function () { } // Callback after click
    }).showToast();
}
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}