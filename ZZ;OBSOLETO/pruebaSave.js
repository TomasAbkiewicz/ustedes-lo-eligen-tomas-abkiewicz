
let button = document.getElementById("button")
let monedas = 10
function guardarDatos(data){
    postData("pruebaSave",data)
}
button.addEventListener("click", guardarDatos(monedas))