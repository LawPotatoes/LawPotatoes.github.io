// Función para obtener los productos del carrito desde localStorage
function obtenerCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito;
}

// Función para guardar los productos del carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const contenedorCarrito = document.getElementById('carrito-contenedor');
    contenedorCarrito.innerHTML = ''; // Limpiar el contenedor

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>No hay productos en el carrito.</p>';
    } else {
        carrito.forEach((producto, index) => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto');
            productoElement.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <label for="cantidad-${index}">Cantidad:</label>
                <input type="number" id="cantidad-${index}" value="${producto.cantidad}" min="1">
                <button class="eliminar-producto" data-index="${index}">Eliminar</button>
            `;
            contenedorCarrito.appendChild(productoElement);
        });
    }
    actualizarTotal();
}

// Función para actualizar el total del carrito
function actualizarTotal() {
    const carrito = obtenerCarrito();
    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });

    document.getElementById('total-carrito').innerText = total.toFixed(2);
}

// Función para manejar la eliminación de un producto
function eliminarProducto(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1); // Eliminar el producto
    guardarCarrito(carrito); // Guardar los cambios en localStorage
    mostrarCarrito(); // Volver a mostrar el carrito actualizado
}

// Función para actualizar la cantidad de un producto
function actualizarCantidad(index, cantidad) {
    let carrito = obtenerCarrito();
    carrito[index].cantidad = cantidad; // Actualizar la cantidad
    guardarCarrito(carrito); // Guardar los cambios en localStorage
    mostrarCarrito(); // Volver a mostrar el carrito actualizado
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
}

// Función para manejar el evento de "Comprar"
function comprar() {
    alert('¡Compra realizada con éxito!'); // Puedes cambiar esta lógica para integrarlo con un sistema de pago real
    vaciarCarrito();
}

// Inicialización de los eventos
function init() {
    mostrarCarrito();

    // Evento para eliminar productos
    document.getElementById('carrito-contenedor').addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-producto')) {
            const index = e.target.getAttribute('data-index');
            eliminarProducto(index);
        }
    });

    // Evento para actualizar la cantidad de productos
    document.getElementById('carrito-contenedor').addEventListener('input', (e) => {
        if (e.target.type === 'number') {
            const index = e.target.id.split('-')[1];
            const cantidad = e.target.value;
            actualizarCantidad(index, parseInt(cantidad));
        }
    });

    // Evento para vaciar el carrito
    document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

    // Evento para realizar la compra
    document.getElementById('comprar').addEventListener('click', comprar);
}

// Ejecutar la inicialización
init();
