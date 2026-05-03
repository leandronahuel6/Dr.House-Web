document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Pequeño retraso para que la animación sea más suave y no se trabe al hacer F5
                setTimeout(() => {
                    entry.target.classList.add('animacion-visible');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.02, // Lo bajamos al 2% para que reaccione casi de inmediato
        rootMargin: "0px 0px -20px 0px" // Ayuda a que el cálculo no falle en elementos muy altos
    });

    const elementosAAnimar = document.querySelectorAll('.animacion-oculta, .sect-principal, .personaje, .container-form');

    elementosAAnimar.forEach(el => {
        if (!el.classList.contains('animacion-oculta')) {
            el.classList.add('animacion-oculta');
        }
        observer.observe(el);
    });
});

// ==========================================
// LÓGICA DEL LIGHTBOX (Galería de Imágenes)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const imagenesGaleria = document.querySelectorAll('.img-galeria');
    const lightbox = document.getElementById('lightbox');
    
    // Si estamos en una página que no tiene galería, detenemos el script aquí
    if (!lightbox) return; 

    const imgLightbox = document.getElementById('img-lightbox');
    const txtLightbox = document.getElementById('texto-lightbox'); // Variable del texto
    const btnCerrar = document.querySelector('.cerrar-lightbox');
    const btnPrev = document.querySelector('.btn-lightbox.prev');
    const btnNext = document.querySelector('.btn-lightbox.next');

    let indiceActual = 0;

    // 1. Abrir la imagen
    imagenesGaleria.forEach((img, index) => {
        img.addEventListener('click', () => {
            indiceActual = index;
            mostrarImagen(indiceActual);
            lightbox.classList.add('activo');
        });
    });

    // Función unificada para foto y texto
    function mostrarImagen(indice) {
        const imagenSeleccionada = imagenesGaleria[indice];
        imgLightbox.src = imagenSeleccionada.src;
        
        const descripcion = imagenSeleccionada.getAttribute('data-descripcion') || imagenSeleccionada.alt || '';
        txtLightbox.textContent = descripcion;
    }

    // 2. Botón Siguiente
    btnNext.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % imagenesGaleria.length;
        mostrarImagen(indiceActual);
    });

    // 3. Botón Anterior
    btnPrev.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + imagenesGaleria.length) % imagenesGaleria.length;
        mostrarImagen(indiceActual);
    });

    // 4. Cerrar con la X
    btnCerrar.addEventListener('click', () => {
        lightbox.classList.remove('activo');
    });

    // 5. Cerrar al hacer clic afuera
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('activo');
        }
    });

    // 6. Teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('activo')) {
            if (e.key === 'Escape') lightbox.classList.remove('activo');
            if (e.key === 'ArrowRight') btnNext.click();
            if (e.key === 'ArrowLeft') btnPrev.click();
        }
    });
});