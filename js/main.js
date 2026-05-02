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