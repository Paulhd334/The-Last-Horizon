// Sélectionne la boîte de consentement
const cookieBox = document.querySelector(".wrapper");

// Détecte si un consentement a déjà été donné
window.addEventListener("load", () => {
  const consent = getCookie("cookieConsent");
  if (consent === "accepted") {
    loadGoogleAnalytics(); // Charger Google Analytics si accepté
  } else if (consent === "declined") {
    console.log("User has declined cookies."); // Ne rien faire si refusé
  } else {
    setTimeout(() => {
      cookieBox.classList.add("show"); // Affiche la boîte
    }, 500);
  }
});

// Charge Google Analytics uniquement si accepté
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

// Gère le clic sur le bouton "Accept"
document.getElementById("acceptBtn").addEventListener("click", () => {
  document.cookie = "cookieConsent=accepted; max-age=" + 60 * 60 * 24 * 30; // Stocke le consentement pendant 30 jours
  cookieBox.classList.remove("show");
  loadGoogleAnalytics(); // Charger Google Analytics
});

// Gère le clic sur le bouton "Decline"
document.getElementById("declineBtn").addEventListener("click", () => {
  document.cookie = "cookieConsent=declined; max-age=" + 60 * 60 * 24 * 30; // Stocke le refus pendant 30 jours
  cookieBox.classList.remove("show");
  console.log("Cookies declined. No data will be collected.");
});

// Fonction pour lire un cookie
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("=");
    if (key === name) return value;
  }
  return null;
}

if (localStorage.getItem('cookie-consent') === 'true') {
    // Charger Google Analytics ou autres services tiers
    // Exemple pour Google Analytics :
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'G-3SR1TYY3HP', 'auto');
    ga('send', 'pageview');
}
