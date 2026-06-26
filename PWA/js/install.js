// ======================================================
// ENS PWA
// Instalador
// ======================================================

// URL que será aberta após instalar o aplicativo.
// Se futuramente mudar o nome da página, basta alterar aqui.
const START_PAGE = "app.html";

const installButton = document.getElementById("installButton");
const iosInstructions = document.getElementById("iosInstructions");
const loading = document.getElementById("loading");

let deferredPrompt = null;

// ======================================================
// Detecta iPhone / iPad
// ======================================================

const isIOS =
    /iphone|ipad|ipod/i.test(window.navigator.userAgent);

// Detecta se já está instalado

const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

// ======================================================
// Se já estiver instalado,
// abre diretamente o aplicativo
// ======================================================

if (isStandalone) {

    window.location.replace(START_PAGE);

}

// ======================================================
// Registrar Service Worker
// ======================================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {

                console.log("Service Worker registrado.");

            })
            .catch((err) => {

                console.error(err);

            });

    });

}

// ======================================================
// iPhone
// ======================================================

if (isIOS && !isStandalone) {

    iosInstructions.classList.remove("hidden");

}

// ======================================================
// Android
// ======================================================

window.addEventListener("beforeinstallprompt", (event) => {

    event.preventDefault();

    deferredPrompt = event;

    installButton.classList.remove("hidden");

});

// ======================================================
// Clique em Instalar
// ======================================================

installButton.addEventListener("click", async () => {

    if (!deferredPrompt) return;

    loading.classList.remove("hidden");

    installButton.disabled = true;

    deferredPrompt.prompt();

    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {

        console.log("Aplicativo instalado.");

        setTimeout(() => {

            window.location.href = "instalado.html";

        }, 1000);

    } else {

        loading.classList.add("hidden");

        installButton.disabled = false;

    }

    deferredPrompt = null;

});

// ======================================================
// Evento quando instalação terminar
// Alguns navegadores disparam automaticamente
// ======================================================

window.addEventListener("appinstalled", () => {

    console.log("Aplicativo instalado.");

    window.location.href = "instalado.html";

});

/*=========================================
ATUALIZAÇÃO AUTOMÁTICA
=========================================*/

navigator.serviceWorker.addEventListener("controllerchange",()=>{

    console.log("Nova versão disponível.");

});

fetch("manifest.json")

.then(r=>r.json())

.then(manifest=>{

console.log(manifest.name);

});