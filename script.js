// URL de la API de productos
const urlProductos = 'https://fakestoreapi.com/products'; // API de ejemplo
// URL de la API de reseñas
const urlReseñas = 'https://api.example.com/reviews'; // Cambia a la URL correcta

// Función para obtener los datos de la API de productos
function obtenerDatosAPI() {
    fetch(urlProductos)  // API de productos
        .then(response => response.json())
        .then(data => mostrarDatosAPI(data))
        .catch(error => console.log('Error al obtener los datos:', error));
}

// Función para mostrar los productos obtenidos de la API
function mostrarDatosAPI(productos) {
    const contenedorProductos = document.getElementById('api-datos');
    contenedorProductos.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevos productos

    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.classList.add('producto-card', 'col-md-4');  // Asegúrate de tener clases para el estilo

        productoCard.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" class="producto-imagen img-fluid">
            <h3 class="producto-titulo">${producto.title}</h3>
            <p class="producto-descripcion">${producto.description.substring(0, 100)}...</p>
            <p class="producto-precio">$${producto.price}</p>
            <button class="btn btn-primary add-to-cart" data-id="${producto.id}" data-titulo="${producto.title}" data-precio="${producto.price}" data-imagen="${producto.image}">Añadir al carrito</button>
            <button class="btn btn-secondary ver-descripcion">Ver descripción ampliada</button>
        `;

        contenedorProductos.appendChild(productoCard);
    });

    // Añadir funcionalidad a los botones "Añadir al carrito"
    const botonesAgregar = document.querySelectorAll('.add-to-cart');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    // Añadir funcionalidad al botón "Ver descripción ampliada"
    const botonesDescripcion = document.querySelectorAll('.ver-descripcion');
    botonesDescripcion.forEach(boton => {
        boton.addEventListener('click', mostrarDescripcionAmpliada);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    const productoId = event.target.getAttribute('data-id');
    const productoTitulo = event.target.getAttribute('data-titulo');
    const productoPrecio = event.target.getAttribute('data-precio');
    const productoImagen = event.target.getAttribute('data-imagen');

    const producto = {
        id: productoId,
        titulo: productoTitulo,
        precio: parseFloat(productoPrecio),
        imagen: productoImagen
    };

    // Obtener carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
        // Si ya está en el carrito, incrementamos la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no está en el carrito, lo agregamos
        producto.cantidad = 1;
        carrito.push(producto);
    }

    // Guardar el carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la interfaz de usuario (opcional)
    alert(`Producto "${productoTitulo}" añadido al carrito.`);
}

// Función para mostrar el carrito de compras
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorCarrito = document.getElementById('carrito-contenedor');
    contenedorCarrito.innerHTML = '';  // Limpiar carrito antes de mostrarlo

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>No hay productos en el carrito.</p>';
    } else {
        let total = 0;
        carrito.forEach(producto => {
            const itemCarrito = document.createElement('div');
            itemCarrito.classList.add('carrito-item', 'row');

            itemCarrito.innerHTML = `
                <div class="col-md-2">
                    <img src="${producto.imagen}" alt="${producto.titulo}" class="carrito-imagen img-fluid">
                </div>
                <div class="col-md-6">
                    <h4 class="carrito-titulo">${producto.titulo}</h4>
                    <p class="carrito-precio">$${producto.precio}</p>
                    <p class="carrito-cantidad">Cantidad: ${producto.cantidad}</p>
                </div>
                <div class="col-md-4">
                    <button class="btn btn-danger remove-from-cart" data-id="${producto.id}">Eliminar</button>
                </div>
            `;
            contenedorCarrito.appendChild(itemCarrito);

            total += producto.precio * producto.cantidad;
        });

        // Mostrar el total
        document.getElementById('total-carrito').textContent = total.toFixed(2);

        // Añadir funcionalidad para eliminar productos del carrito
        const botonesEliminar = document.querySelectorAll('.remove-from-cart');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', eliminarDelCarrito);
        });
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(event) {
    const productoId = event.target.getAttribute('data-id');
    
    // Obtener carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Filtrar el producto a eliminar
    carrito = carrito.filter(item => item.id !== productoId);

    // Guardar el carrito actualizado
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Volver a mostrar el carrito actualizado
    mostrarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
}

// Función para realizar la compra (vaciar carrito)
function comprar() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        alert("No hay productos en el carrito para comprar.");
    } else {
        alert("¡Gracias por tu compra!");
        vaciarCarrito();
    }
}

// Función para cargar las reseñas desde la API
function cargarReseñas() {
    fetch(urlReseñas)
        .then(response => response.json())
        .then(data => {
            const contenedorReseñas = document.getElementById('productos-reseñas');
            contenedorReseñas.innerHTML = ''; // Limpiar el contenedor antes de agregar reseñas

            data.forEach(reseña => {
                const card = document.createElement('div');
                card.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');
                card.innerHTML = `
                    <div class="card">
                        <img src="${reseña.imagen}" class="card-img-top" alt="${reseña.producto}">
                        <div class="card-body">
                            <h5 class="card-title">${reseña.producto}</h5>
                            <p class="card-text">${reseña.comentario}</p>
                            <p class="card-text"><strong>Calificación:</strong> ${reseña.calificacion} estrellas</p>
                        </div>
                    </div>
                `;
                contenedorReseñas.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar las reseñas:', error));
}

// Evento click para mostrar la descripción ampliada
function mostrarDescripcionAmpliada(event) {
    const productoCard = event.target.closest('.producto-card');
    const descripcion = productoCard.querySelector('.producto-descripcion').textContent;
    alert("Descripción completa: " + descripcion);
}

// Llamar a las funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('api-datos')) {
        obtenerDatosAPI(); // Cargar productos desde la API
    }
    if (document.getElementById('productos-reseñas')) {
        cargarReseñas(); // Cargar reseñas desde la API
    }

    // Mostrar el carrito en la página de carrito
    if (document.getElementById('carrito-contenedor')) {
        mostrarCarrito();

        // Añadir funcionalidad de vaciar el carrito y comprar
        document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
        document.getElementById('comprar').addEventListener('click', comprar);
    }
});
