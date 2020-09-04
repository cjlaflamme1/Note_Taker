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
}