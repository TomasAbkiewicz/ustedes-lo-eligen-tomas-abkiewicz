
let  usuarioGuardado = {
    usuario: undefined,
    contraseña: undefined, 
    id: undefined,
}
let usuarioIngresado = {
    usuario: undefined,
    contraseña: undefined,
    id = undefined
}

usuarioIngresado.usuario= document.getElementById("usuarioLogIn")
usuarioIngresado.contraseña= document.getElementById("contraseñaLogIn")

const USUARIOS= JSON.parse(fs.readFile("Usuarios.json", 'utf-8', (err) => {
    if (err) {
      alert('Error al leer el archivo:', err);
    }
}))
const CONTRASEÑAS= JSON.parse(fs.readFile("Contraseñas.json", 'utf-8', (err) => {
    if (err) {
      alert('Error al leer el archivo:', err);
    }
}))

function bajarDatos(){
    if(USUARIOS.indexOf(usuarioIngresado.usuario) === USUARIOS.indexOf(usuarioIngresado.contraseña)){
        usuarioGuardado.id = USUARIOS.indexOf(usuarioIngresado.usuario)
        usuarioGuardado.contraseña = USUARIOS[usuarioGuardado.id]
        usuarioGuardado.usuario = USUARIOS[usuarioGuardado.id]
        return true
    } else{
        alert("usuario y/o contraseña invalido")
    }
}


function ingresar(){
    console.log("corre")
    if (bajarDatos) {
        window.location.href = "Proyecto.html"
        console.log("hola")
    } else{
        document.getElementById("usuarioLogIn").value = ""
        document.getElementById("contraseñaLogIn").value = ""
        alert("usuario o contraseña incorrectos")
    }
}


document.getElementById("ingresar").addEventListener("click", meterDatosUsuarioIngresado)
document.getElementById("ingresar").addEventListener("click", meterDatosUsuarioGuardado)
document.getElementById("ingresar").addEventListener("click", ingresar)