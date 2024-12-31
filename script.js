const cookieBox = document.querySelector(".wrapper");

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
      gtag("config", "G-3SR1TYY3HP");
      window.gaLoaded = true; // Empêche un double chargement
    };
  }
};

// Gérer le consentement
window.addEventListener("load", () => {
  const consent = getCookie("cookieConsent");
  if (consent === "accepted") {
    loadGoogleAnalytics();
  } else if (!consent) {
    setTimeout(() => cookieBox.classList.add("show"), 500);
  }
});

// Gérer les boutons
document.getElementById("acceptBtn").addEventListener("click", () => {
  document.cookie = "cookieConsent=accepted; max-age=" + 60 * 60 * 24 * 30 + "; path=/";
  cookieBox.classList.remove("show");
  loadGoogleAnalytics();
});

document.getElementById("declineBtn").addEventListener("click", () => {
  document.cookie = "cookieConsent=declined; max-age=" + 60 * 60 * 24 * 30 + "; path=/";
  cookieBox.classList.remove("show");
  console.log("Cookies declined. No data will be collected.");
});
