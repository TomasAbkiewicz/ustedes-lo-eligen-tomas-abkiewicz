function autoclicker(element, cps, time) {
    if (cps <= 0 && time <= 0 && !element) return; 
    const interval = 1000 / cps; 
    const clickInterval = setInterval(() => {
        element.click();
    }, interval);

    setTimeout(() => {
        clearInterval(clickInterval);
    }, time);
}
