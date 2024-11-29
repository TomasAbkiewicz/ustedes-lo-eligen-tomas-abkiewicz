import fs from "fs";
let filePathU = './data/users.json';
let filePathG = "./data/gamesFile.json";
let currentUserId;

let USERS = fs.readFileSync(filePathU, "utf-8");
USERS = USERS ? JSON.parse(USERS) : []; 


let GAMES = fs.readFileSync(filePathG, "utf-8");
GAMES = GAMES ? JSON.parse(GAMES) : [];

export function newUser(user) {

    let usuarioExistente = USERS.some(u => u.username === user.username);
    if (usuarioExistente) {
        return false;
    }


    let userdata = {     
        username: user.username,
        password: user.password,
        id: USERS.length + 1,
    };
    USERS.push(userdata); 


    let game = {
        userId: userdata.id,
        currency: {
            sunflowers: 10,
        },
        upgrades:{
            up1: 0,
            up2: 0,
            up3: 0,
            ac1: 0,
            ac2: 0,
            ac3: 0,
        }
        }    
        GAMES.push(game);
        fs.writeFileSync(filePathU, JSON.stringify(USERS, null, 2));
        fs.writeFileSync(filePathG, JSON.stringify(GAMES, null, 2));
        return { ok: true };
}
            

   



export function save(game) {

    let GAMES = fs.readFileSync(filePathG, "utf-8");
    GAMES = GAMES ? JSON.parse(GAMES) : [];
    let id = game.userId;
    GAMES[id-1] = game

    fs.writeFileSync(filePathG, JSON.stringify(GAMES, null, 2));

    return { ok: true };
}

export function login(input){
    for (const user of USERS) {
        if (user.username === input.username) {     
            if (user.password === input.password) {
                let userId = user.id
                currentUserId = userId;
                return userId;
        }else{
            return false
            }
        }
    }
}
export function loadGame(userId){
    let games = JSON.parse(fs.readFileSync(filePathG, "utf-8"))
    
    return games[userId-1];
}
