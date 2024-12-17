const cookieBox = document.querySelector(".wrapper"),
  buttons = document.querySelectorAll(".button");

// Fonction pour charger Google Analytics
const loadGoogleAnalytics = () => {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-3SR1TYY3HP";
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-3SR1TYY3HP"); 
  };
};

// Fonction principale pour gérer les cookies
const executeCodes = () => {
  // Vérifie si un cookie existe déjà
  if (document.cookie.includes("cookieConsent")) return;

  // Affiche la fenêtre des cookies
  cookieBox.classList.add("show");

  // Ajoute des événements aux boutons
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      cookieBox.classList.remove("show");

      if (button.id === "acceptBtn") {
        // Accepter les cookies : définir le cookie pour 30 jours
        document.cookie = "cookieConsent=accepted; max-age=" + 60 * 60 * 24 * 30;
        loadGoogleAnalytics(); // Charger Google Analytics
      } else if (button.id === "declineBtn") {
        // Refuser les cookies
        document.cookie = "cookieConsent=declined; max-age=" + 60 * 60 * 24 * 30;
      }
    });
  });
};

// Vérifie si l'utilisateur a déjà accepté les cookies
if (document.cookie.includes("cookieConsent=accepted")) {
  loadGoogleAnalytics();
}

// Exécute la fonction au chargement de la page
window.addEventListener("load", executeCodes);
