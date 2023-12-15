const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) =>
{
    window.deferredPrompt = event;
    butInstall.classList.remove("hidden");
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall?.addEventListener("click", async () =>
{
    if (window.deferredPrompt)
    {
        promptEvent.prompt();
        window.deferredPrompt = null;
        butInstall.classList.add("hidden");
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", () =>
    window.deferredPrompt = null
);
