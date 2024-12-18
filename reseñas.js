// Lista de reseñas falsas para los productos
const fakeReviews = [
    "Excelente producto, superó mis expectativas.",
    "Muy bueno, lo recomendaría sin dudar.",
    "Buena calidad, aunque podría mejorar en algunos aspectos.",
    "No me convenció, esperaba algo mejor por el precio.",
    "Perfecto para lo que necesitaba, me encanta.",
    "Súper práctico y de gran calidad, lo usaré todo el tiempo."
];

// Función para obtener productos de la API y mostrar las reseñas
async function loadProducts() {
    try {
        // URL de la API pública que contiene los productos
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        const productContainer = document.getElementById('productos-reseñas');
        
        products.forEach(product => {
            // Generar una reseña aleatoria para cada producto
            const randomReview = fakeReviews[Math.floor(Math.random() * fakeReviews.length)];
            
            // Crear el HTML para cada producto con su reseña
            const productCard = document.createElement('div');
            productCard.classList.add('producto');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <h4>Reseña:</h4>
                <p>"${randomReview}"</p>
                <p><strong>Precio:</strong> $${product.price}</p>
            `;

            // Agregar la card al contenedor de productos
            productContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Llamar a la función cuando se cargue la página
window.onload = loadProducts;
