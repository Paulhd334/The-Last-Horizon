// Fonction debounce pour limiter le nombre d'appels
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function scrollToElement(elementSelector, instance = 0) {
    const element = document.querySelectorAll(elementSelector)[instance];
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.warn(`Instance ${instance} non trouvée pour le sélecteur "${elementSelector}".`);
    }
}

// Définir les liens et les instances
const links = [
    { element: document.getElementById("link1"), selector: '.header', instance: 0 },
    { element: document.getElementById("link2"), selector: '.header', instance: 1 },
    { element: document.getElementById("link3"), selector: '.column', instance: 0 }
];

// Boucle pour ajouter un événement de clic avec debounce
links.forEach(link => {
    link.element.addEventListener('click', debounce(() => {
        scrollToElement(link.selector, link.instance);
    }, 200)); // Délai de 200ms pour le debounce
});

document.addEventListener("DOMContentLoaded", () => {
    // Sélectionne tous les éléments avec les classes "animate-from-left" et "animate-from-right"
    const elements = document.querySelectorAll(".animate-from-left, .animate-from-right");

    // Supprime la classe "hidden" pour déclencher l'animation
    elements.forEach((element) => {
        element.classList.remove("hidden");
    });
});
