const fs = require('fs');
const express = require('express');
const {notes} = require('./develop/db');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.json());

function createNewNote(body, notesArray) {
    const notes = body;
    notesArray.push(notes);
    fs.writeFileSync(
        path.join(__dirname, './db.json'),
        JSON.stringify({notes:notesArray}, null, 2)
    );
    return notes;
}

function validateNotes(notes) {
    if(!notes || typeof notes !== 'string') {
        return false;
    }
    return true;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API serviers now on port ${PORT}!`);
});
