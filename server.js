const fs = require('fs');
const path = require('path');
const express = require('express');
const {notes} = require('./db/notes.json');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.static('public'));
app.use(express.json());

function createNewNote(body, notesArray) {
    const notes = body;
    notesArray.push(notes);
    fs.writeFileSync(
        path.join(__dirname, './db/notes.json'),
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

app.post('/db/notes', (req, res) => {
    if (!validateNotes(req.body)) {
        res.status(400).send('The note is not right!');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API servers now on port ${PORT}!`);
});
