let fs = require("fs")
let user = {
    data = {
        username = "joaco",
        password =  "123",
    }
}

fs.writeFileSync("pruebas.json", user)