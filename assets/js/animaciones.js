// ======== ANIMACIÓN INFINITA PARA .box3 ========
const box3 = document.querySelector(".box3");
if (box3) {
    box3.animate(
        [
            { transform: "translate(0) rotate(0)" },
            { transform: "translate(400px) rotate(180deg)" }
        ],
        {
            duration: 5000,
            iterations: Infinity,
            direction: "alternate",
            fill: "forwards"
        }
    );
}

// ======== TOGGLE CLASE .LIGHT EN .ELEMENT2 ========
const element2 = document.querySelector(".element2");
if (element2) {
    element2.addEventListener("click", () => {
        element2.classList.toggle("light");
    });
}

// ======== TOGGLE DIÁLOGO ========
const button = document.querySelector(".btn1");
const dialog = document.querySelector("dialog");
if (button && dialog) {
    button.addEventListener("click", () => {
        dialog.toggleAttribute("open");
    });
}

// ======== ACTUALIZACIÓN DINÁMICA DEL OFFSET-PATH ========
const size = document.querySelector("select.size");
const output = document.querySelector("output");
const input = document.querySelector("input[type=range]");
const box = document.querySelector(".container .box");
const contain = document.querySelector(".contain");
const code = document.querySelector("code");

if (size && output && input && box && contain && code) {
    const update = () => {
        const sizeValue = size.value;
        const containValue = contain.checked ? " contain" : "";
        output.textContent = input.value + "turn";
        const rayValue = `ray(${output.textContent} ${sizeValue}${containValue})`;
        box.style.setProperty("offset-path", rayValue);
        code.textContent = `offset-path: ${rayValue}`;
    };

    input.addEventListener("input", update);
    size.addEventListener("input", update);
    contain.addEventListener("input", update);
}

// ======== VIEW TRANSITION ========
const firstElement = document.querySelector(".start");
const secondElement = document.querySelector(".end");

if (firstElement && secondElement) {
    firstElement.addEventListener("click", () => {
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                firstElement.classList.toggle("end");
                firstElement.classList.toggle("start");
                secondElement.classList.toggle("start");
                secondElement.classList.toggle("end");
            });
        } else {
            // Fallback para navegadores que no soportan View Transitions
            firstElement.classList.toggle("end");
            firstElement.classList.toggle("start");
            secondElement.classList.toggle("start");
            secondElement.classList.toggle("end");
        }
    });
}

// ======== ANIMACIÓN CON WEB ANIMATIONS API ========
const elemental = document.querySelector(".element66");
if (elemental) {
    const keyframes = [
        { transform: "translate(0, 0)" },
        { transform: "translate(200px, 0)" },
        { transform: "translate(200px, 200px)" },
        { transform: "translate(0, 200px)" },
        { transform: "translate(0, 0)" }
    ];

    const animation = elemental.animate(keyframes, {
        duration: 4000,
        iterations: Infinity,
        easing: "ease-in-out"
    });

    // Pausar/reanudar al hacer clic
    elemental.addEventListener("click", () => {
        if (animation.playState === "running") {
            animation.pause();
        } else {
            animation.play();
        }
    });
}

// ======== MEJORAR LA EXPERIENCIA DEL DIÁLOGO ========
const discreteCheckbox = document.querySelector(".discrete");
if (discreteCheckbox && dialog) {
    discreteCheckbox.addEventListener("change", () => {
        if (discreteCheckbox.checked) {
            dialog.style.transitionBehavior = "allow-discrete";
        } else {
            dialog.style.transitionBehavior = "normal";
        }
    });
}

// ======== AÑADIR INDICADORES VISUALES ========
document.addEventListener("DOMContentLoaded", () => {
    // Añadir títulos descriptivos a elementos interactivos
    const interactiveElements = [
        { selector: ".element2", title: "Haz clic para alternar efecto de luz" },
        { selector: ".element66", title: "Haz clic para pausar/reanudar animación" },
        { selector: ".box4", title: "Pasa el mouse para ver clip-path" },
        { selector: ".element3", title: "Pasa el mouse para ver efecto hover" },
        { selector: ".box6", title: "Pasa el mouse para cambiar color" },
        { selector: ".element1", title: "Pasa el mouse para expandir" }
    ];

    interactiveElements.forEach(({ selector, title }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.setAttribute("title", title);
            element.style.cursor = "pointer";
        }
    });

    // Añadir etiquetas informativas a las secciones
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        const h2 = section.querySelector("h2");
        if (h2) {
            h2.style.color = "#333";
            h2.style.borderBottom = "2px solid #007bff";
            h2.style.paddingBottom = "0.5rem";
            h2.style.marginBottom = "1rem";
        }
    });

    // Mostrar mensaje de bienvenida en consola
    console.log("🎬 Página de animaciones cargada correctamente!");
    console.log("✨ Todas las animaciones están funcionando");
    console.log("🚀 Desarrollado por Camilo Dev");
});

// ======== FUNCIÓN PARA REINICIAR ANIMACIONES ========
function restartAnimations() {
    const animatedElements = document.querySelectorAll('[style*="animation"]');
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        element.offsetHeight; // Trigger reflow
        element.style.animationPlayState = 'running';
    });
}

// ======== DETECCIÓN DE VISIBILIDAD PARA OPTIMIZACIÓN ========
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, { threshold: 0.1 });

    // Observar elementos con animaciones costosas
    const expensiveAnimations = document.querySelectorAll('.bernard, .bernard1, .bernard2');
    expensiveAnimations.forEach(element => {
        observer.observe(element);
    });
}

// ======== MANEJO DE ERRORES GLOBAL ========
window.addEventListener('error', (e) => {
    console.warn('Error en animación:', e.message);
});

// ======== COMPATIBILIDAD CON NAVEGADORES ANTIGUOS ========
if (!Element.prototype.animate) {
    console.warn('Web Animations API no soportada. Algunas animaciones pueden no funcionar.');
}

// ======== EXPORTAR FUNCIONES ÚTILES ========
window.AnimationUtils = {
    restartAnimations,
    pauseAllAnimations: () => {
        document.querySelectorAll('*').forEach(el => {
            if (getComputedStyle(el).animationName !== 'none') {
                el.style.animationPlayState = 'paused';
            }
        });
    },
    resumeAllAnimations: () => {
        document.querySelectorAll('*').forEach(el => {
            if (getComputedStyle(el).animationName !== 'none') {
                el.style.animationPlayState = 'running';
            }
        });
    }
};