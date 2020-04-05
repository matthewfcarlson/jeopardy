const consola = require('consola')
GS_LOBBY = "LOBBY";
GS_CATEGORIES = "CATEGORIES";
GS_PICK_QUESTION = "PICKING";
GS_ANS_QUESTION = "ANSWERING";
GS_REVEAL_ANSWER = "REVEAL";
GS_DOUBLE_JEP = "DOUBLEJEP";
GS_FINAL_JEP = "FINAL";

const games = new Map();
class Game {

    constructor(code) {
        this.game_code = code || getNewGameCode();
        this.state = GS_LOBBY;
        this.allow_voting = false;
        // generate 10 categories to pick from
        if (this.allow_voting) {
            this.possible_categories = [""]
            this.category_votes = []; // Array file for the number of categories
        }
    }
    generateCategories(number) {
        // returns the specified number of categories
    }
    startGame(){
        if (this.state != GS_LOBBY && this.state != this.GS_CATEGORIES) return false;
        this.state = this.GS_PICK_QUESTION;
        // generate categories if we need to
        // Generate
        return true;
    }
    getPlayerData() {
        // Gets the player Data and sends out an update
        let base_data =  {
            state: this.state,
            question: "CURRENT QUESTION",
            categories: []
        }

        if (this.state == this.GS_CATEGORIES) {
            return this.possible_categories;
        }

        return base_data;
    }

    getHostData() {
        // Gets the current state of the game and sends out to host
        let data = this.getPlayerData();
        let host_data = {
            answer: "TEST"
        }
        return {...data, host_data}
    }
}
// I wish this was less hacky
const questions = require("../../assets/data/questions.json");
const categories = new Set(questions.map(x => x.category || "UNKNOWN"));
console.log("We have " + categories.length + " categories");

const room_codes = require("../../assets/data/room_codes.json");

function getNewGameCode(){
    //Finds a game code that's not currently in use
    let potentialRoomCodeIndex = -1;
    let iterationCount = 0;
    while (potentialRoomCodeIndex === -1 && iterationCount < 1000) {
        potentialRoomCodeIndex = Math.floor(Math.random() * room_codes.length);
        if (games.has(room_codes[potentialRoomCodeIndex])) {
            potentialRoomCodeIndex = -1;
            // TODO figure out a better way to do this? Start walking the tree?
            // TODO: have a list of unused room codes?
        }
        iterationCount += 1;
    }
    if (potentialRoomCodeIndex === -1) {
        // This is an error case - not sure what to do here.
        console.error("Unable to generate a room ID");
        return "ERROR";
    }
    return room_codes[potentialRoomCodeIndex].toUpperCase();
}

const FirstGame = new Game("TESTY");
games.set("TESTY", FirstGame);
consola.info("Creating a default game: "+ FirstGame.game_code);

function express(app) {
    // Initialize our service with any options it requires
    app.head('/api/games/:id', (req, res) => {
        try {
            const id = req.params.id;
            if (id == undefined) throw "Bad request";
            if (id.length != 5) throw "BAD request";
            const game_code = id.toUpperCase();
            if (!games.has(game_code)) throw "Not found";
            res.status(200).send("FOUND");
        }
        catch {
            res.status(404).send('Not Found');
        }

    });
    app.get('/api/games/:id', (req, res) => {
        try {
            console.log("API GET: " + req);
            console.log(req.params);
        }
        catch {
            res.status(404).send('Not Found');
        }

    });
    app.post('/api/games/?', (req, res) => {

        try {
            console.log(req.params);
            console.log(req.body);
            const game = new Game();
            const code = game.code;
            if (game == null) {
                throw "Failed to create game"
            }
            games.set(code, game);
            res.send(code);
        }
        catch {
            res.status(500).send('Failed to create a game');
        }

    });
}

module.exports = {
    express
};