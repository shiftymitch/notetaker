let noteData = require("../db/db");
const fs = require("fs");
const path = require("path");


module.exports = function(app) {

    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });

    app.post("/api/notes", function (req, res) {
        noteData.push(req.body);
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData));
        res.json(true);
    });
    
    app.delete("/api/notes/:id", function (req, res) {
        let chosen = req.params.id;
        for (let note of noteData) {
            if (chosen === note.id) {
                let index = noteData.indexOf(note);
                noteData.splice(index, 1);
                fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData));
            }
        }
        res.send("Removed note ID: " + chosen);
    });
};