let id = 0
function crearUser(user) {
    let USERS = fs.readFileSync(JSON.parse("usersFile.json"), "utf-8");
    let user = {
        data = {        
        username: user.username,
        password: user.password,
        id:0,
        },
    }

    for (let i = 0; i < USERS.length; i++) {
        let n = USERS[i].user.data.username
        let tf = true
        if(n === user.data.username){
            tf = false
        } else{
            tf = true
            break 
        } 
        if (tf = false){
            if(USERS.length <0){
                id = USERS[USERS.length - 1].user.data.id + 1
            }
            USERS.user.data.id = id
            USERS.push(user);
            fs.writeFileSync("usersFile.json", JSON.stringify(USERS))
        }
    }

}
