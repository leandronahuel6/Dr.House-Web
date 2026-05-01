document.addEventListener("DOMContentLoaded", () => {
    // Configuramos el Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animacion-visible');
                // Dejamos de observar una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    });

    // Seleccionamos los elementos de index.html que queremos animar
    const elementosAAnimar = document.querySelectorAll('.sect-principal, .personaje, .container-form');

    // Añadimos la clase oculta inicial y los empezamos a observar
    elementosAAnimar.forEach(el => {
        el.classList.add('animacion-oculta');
        observer.observe(el);
    });
});