const fs = require('fs');

class Settings {
    constructor() {
        console.log("Trying");
        let content = fs.readFileSync("./settings.json");
        content = JSON.parse(content);
        this.token = content.token;
        this.banemote = content.banemote;
        console.log(this)
    }
}

module.exports = new Settings();
