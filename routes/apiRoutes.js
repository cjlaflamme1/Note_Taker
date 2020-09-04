const path = require('path');
const db = require('../db/db.json');
const fs = require('fs');



module.exports = (app) => {
    app.get("/api/notes", (req, res) => {
        res.json(db);
    });

    app.post("/api/notes", (req, res) => {
        const { title, text} = req.body;
        let id = 1;
        if(db.length !== 0) {
            const lastItem = db[db.length -1];
            const {id: oldID} = lastItem;
            id = oldID + 1;
        }
        db.push({id, title, text});
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), (err) => {
            if(err) throw err;
            console.log('The file has been saved.')
        })
        res.json(db);
    });

    app.delete("/api/notes/:id", (req, res) => {
        const URL = req.url.split("/");
        const selectedNote = parseInt(URL[URL.length - 1]);
        console.log(selectedNote);
        db.forEach(({id: noteID}) => {
            if(selectedNote === noteID) {
                const index = db.indexOf(noteID);
                db.splice(index, 1);
            }
        });
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), (err) => {
            if(err) throw err;
            console.log('The file has been saved.')
        })
        res.json(db);
    })
}