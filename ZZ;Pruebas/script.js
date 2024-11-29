let autoclickerActive = false;
let clickInterval;
let clickCount = 0;

document.getElementById("autoclickerBtn").addEventListener("click", () => {
    if (!autoclickerActive) {
        autoclickerActive = true;
        startAutoclicker();
        document.getElementById("autoclickerBtn").textContent = "Stop Autoclicker";
    } else {
        stopAutoclicker();
        document.getElementById("autoclickerBtn").textContent = "Start Autoclicker";
    }
});

document.getElementById("countBtn").addEventListener("click", () => {
    alert(`Total Clicks: ${clickCount}`);
});

function startAutoclicker() {
    clickInterval = setInterval(() => {
        clickCount++;
        document.getElementById("countDisplay").textContent = `Clics: ${clickCount}`;
        console.log("Clicked!"); // Simulando un clic
    }, 100); // 100 ms = 10 clics por segundo
}

function stopAutoclicker() {
    clearInterval(clickInterval);
    autoclickerActive = false;
}
