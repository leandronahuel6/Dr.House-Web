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

    // Seleccionamos los elementos viejos del index Y cualquier elemento nuevo que tenga la clase
    const elementosAAnimar = document.querySelectorAll('.sect-principal, .personaje, .container-form, .animacion-oculta');

    // Los procesamos todos
    elementosAAnimar.forEach(el => {
        // Si el elemento no tiene la clase oculta inicial (como pasaba en el index), se la agregamos
        if (!el.classList.contains('animacion-oculta')) {
            el.classList.add('animacion-oculta');
        }
        // Empezamos a vigilar el elemento
        observer.observe(el);
    });
});