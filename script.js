const cookieBox = document.querySelector(".wrapper"),
  buttons = document.querySelectorAll(".button");

// Lire un cookie
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("=");
    if (key === name) return value;
  }
  return null;
}

// Charger Google Analytics
const loadGoogleAnalytics = () => {
  if (!window.gaLoaded) {
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
      gtag("config", "G-3SR1TYY3HP", {
        'anonymize_ip': true, // Anonymiser l'IP
        'send_page_view': false // Ne pas envoyer de page vue avant le consentement
      });
      window.gaLoaded = true; // Empêche un double chargement
    };
  }
};

// Fonction pour gérer les signaux de consentement
const loadAnalytics = (consent) => {
  if (typeof gtag !== 'undefined') {
    if (consent === 'accepted') {
      // Mettre à jour le consentement pour Google Analytics
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
      });
      loadGoogleAnalytics(); // Charger Google Analytics si accepté
    } else {
      // Refuser le consentement pour Google Analytics
      gtag('consent', 'update', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied'
      });
    }
  }
};

// Afficher la bannière de cookies et gérer les événements de clic
const executeCodes = () => {
  cookieBox.classList.add("show");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      cookieBox.classList.remove("show");
    });
  });
};

// Gérer le consentement
window.addEventListener("load", () => {
  const consent = getCookie("cookieConsent");
  if (consent === "accepted") {
    loadGoogleAnalytics(); // Si accepté, charger Google Analytics
  } else if (!consent) {
    setTimeout(executeCodes, 500); // Afficher la bannière si aucun consentement
  }
});

document.getElementById("acceptBtn").addEventListener("click", function() {
    // Accepter les cookies et envoyer le signal de consentement
    document.cookie = "cookieConsent=accepted; max-age=" + 60 * 60 * 24 * 30 + "; path=/";
    loadAnalytics('accepted');
    cookieBox.classList.remove("show"); // Fermer la bannière
});

document.getElementById("declineBtn").addEventListener("click", function() {
    // Refuser les cookies et ne pas collecter de données
    document.cookie = "cookieConsent=declined; max-age=" + 60 * 60 * 24 * 30 + "; path=/";
    loadAnalytics('denied');
    cookieBox.classList.remove("show"); // Fermer la bannière
});


