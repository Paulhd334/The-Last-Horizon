// Fonction debounce pour limiter le nombre d'appels
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Fonction pour faire défiler jusqu'à un élément
function scrollToElement(elementSelector, instance = 0) {
    const element = document.querySelectorAll(elementSelector)[instance];
    if (element) {
        // Défilement avec un léger décalage pour les éléments fixes (comme les en-têtes)
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    if (link.element) {
        link.element.addEventListener('click', debounce(() => {
            scrollToElement(link.selector, link.instance);
        }, 200)); // Délai de 200ms pour le debounce
    }
});

// Chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    // Sélectionne tous les éléments avec les classes "animate-from-left" et "animate-from-right"
    const elements = document.querySelectorAll(".animate-from-left, .animate-from-right");

    // Supprime la classe "hidden" pour déclencher l'animation avec une transition douce
    elements.forEach((element) => {
        element.classList.remove("hidden");
        // Ajout d'une animation CSS pour la transition
        element.style.transition = "opacity 0.5s ease-in-out";
        element.style.opacity = 1; // S'assurer que l'élément est visible
    });
});

// Gestion des événements de clic de manière générique pour un nombre dynamique de liens
document.body.addEventListener('click', function(event) {
    const link = event.target.closest('.link-class'); // Adapte le sélecteur pour tes liens
    if (link) {
        const index = Array.from(link.parentNode.children).indexOf(link);
        debounce(() => {
            scrollToElement(link.dataset.selector, index); // Utilisation d'un attribut "data-selector"
        }, 200)();
    }
});
