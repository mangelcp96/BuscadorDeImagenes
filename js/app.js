// app.js optimizado

// Clave de Acceso a la API de Unsplash
const claveApi = "dFK72t9m80UfSWmyQ5PIwcwCx8R9sbRStMGiQJZngZA";
const urlBase = 'https://api.unsplash.com/search/photos';
let paginaActual = 1;
let busquedaActual = '';

// Escuchamos el evento submit del formulario
document.getElementById('formulario').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    busquedaActual = document.getElementById('termino').value.trim();
    paginaActual = 1; // Reiniciamos a la primera página con cada nueva búsqueda
    buscarImagenes(); // Invocamos la función para buscar imágenes
});

// Función para buscar imágenes utilizando la API de Unsplash
function buscarImagenes() {
    const terminoDeBusqueda = busquedaActual || 'naturaleza'; // Un término de búsqueda predeterminado
    const url = `${urlBase}?query=${encodeURIComponent(terminoDeBusqueda)}&page=${paginaActual}&client_id=${claveApi}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarImagenes(resultado.results));
}


// Función para mostrar las imágenes obtenidas en el HTML
function mostrarImagenes(imagenes) {
    const contenedor = document.getElementById('resultado');
    contenedor.innerHTML = ''; // Limpiamos resultados anteriores

    // Creamos y agregamos cada imagen al contenedor
    imagenes.forEach(imagen => {
        const elementoImagen = document.createElement('img');
        elementoImagen.src = imagen.urls.small;
        elementoImagen.alt = imagen.description || 'Imagen sin descripción';
        elementoImagen.classList.add('w-full', 'rounded', 'mb-4');
        contenedor.appendChild(elementoImagen);
    });

    // Llamamos a la función para mostrar los botones de paginación
    mostrarPaginacion();
}

// Función para gestionar la paginación
function mostrarPaginacion() {
    const contenedorPaginacion = document.getElementById('paginacion');
    contenedorPaginacion.innerHTML = ''; // Limpiamos la paginación anterior

    // Botón para ir hacia atrás
    if (paginaActual > 1) {
        const btnAtras = crearBotonPaginacion('Atrás', () => {
            paginaActual--;
            buscarImagenes();
        });
        contenedorPaginacion.appendChild(btnAtras);
    }

    // Botón para ir hacia adelante
    const btnAdelante = crearBotonPaginacion('Adelante', () => {
        paginaActual++;
        buscarImagenes();
    });
    contenedorPaginacion.appendChild(btnAdelante);
}

// Función auxiliar para crear botones de paginación
function crearBotonPaginacion(texto, accion) {
    const boton = document.createElement('button');
    boton.textContent = texto;
    boton.classList.add('bg-yellow-400', 'cursor-pointer', 'font-bold', 'uppercase', 'rounded', 'px-4', 'py-2', 'mr-2');
    boton.addEventListener('click', accion);
    return boton;
}

// Cargar imágenes por defecto al cargar la página
document.addEventListener('DOMContentLoaded', buscarImagenes);
