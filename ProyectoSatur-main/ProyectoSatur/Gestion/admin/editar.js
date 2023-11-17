function editarProducto(indice) {
    // Obtén el producto actual basado en el índice
    const productoEditar = productos[indice];

    // Llena los campos de entrada con los valores actuales del producto
    document.getElementById('productoAñadir').value = productoEditar.nombre;
    document.getElementById('descripcionAñadir').value = productoEditar.descripcion;
    document.getElementById('valorAñadir').value = productoEditar.valor;
    document.getElementById('existenciaAñadir').value = productoEditar.existencia;
    document.getElementById('ImagenAñadir').value = productoEditar.urlImagen;

    // Cambia el texto del botón de "Añadir" a "Guardar" para indicar que estamos editando
    document.getElementById('botonAñadir').value = 'Guardar';

    // Ahora, puedes manejar la lógica para guardar los cambios cuando se hace clic en "Guardar"
    document.getElementById('botonAñadir').onclick = function() {
        // Lógica para guardar los cambios (puedes utilizar la función manejarProducto)
        manejarProducto(indice);
        
        // Restaura el texto del botón a "Añadir"
        document.getElementById('botonAñadir').value = 'Añadir';

        // Restaura la función de clic del botón a la función original de añadir
        document.getElementById('botonAñadir').onclick = function(event) {
            event.preventDefault();
            manejarProducto();
        };
    };
}
