import fs from "fs/promises";

let filePathU = './data/users.json';
let filePathG = "./data/gamesFile.json";
let currentUserId;

let USERS = [];
let GAMES = [];


async function loadInitialData() {
    try {
        const usersData = await fs.readFile(filePathU, "utf-8");
        USERS = usersData ? JSON.parse(usersData) : [];
        
        const gamesData = await fs.readFile(filePathG, "utf-8");
        GAMES = gamesData ? JSON.parse(gamesData) : [];
    } catch (error) {
        console.error("Error loading data:", error);
        GAMES = [];
    }
}


loadInitialData();

export async function newUser(user) {
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
        upgrades: {
            up1: 0,
            up2: 0,
            up3: 0,
            ac1: 0,
            ac2: 0,
            ac3: 0,
        }
    };

    try {
        GAMES.push(game);
        await fs.writeFile(filePathU, JSON.stringify(USERS, null, 2));
        await fs.writeFile(filePathG, JSON.stringify(GAMES, null, 2));
        return { ok: true };
    } catch (error) {
        console.error("Error saving data:", error);
        return { ok: false };
    }
}

export async function save(game) {
    try {
        let id = game.userId;
        GAMES[id - 1] = game;
        await fs.writeFile(filePathG, JSON.stringify(GAMES, null, 2));
        return { ok: true };
    } catch (error) {
        console.error("Error saving game:", error);
        return { ok: false };
    }
}

export function login(input) {
    for (const user of USERS) {
        if (user.username === input.username) {
            if (user.password === input.password) {
                let userId = user.id;
                currentUserId = userId;
                return userId;
            } else {
                return false;
            }
        }
    }
    return false;
}

export async function loadGame(userId) {
    try {
        return GAMES[userId - 1];
    } catch (error) {
        console.error("Error loading game:", error);
        return null;
    }
}

