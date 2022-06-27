const express = require('express');
const path = require('path');
const fs = require('fs');


const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//Cannot POST /api/notes

//Cannot GET /api/notes
app.get("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {    //READ
        if (err) {
          console.error(err);
        } else {
            console.log("data", data);
          // Convert string into JSON object
          const notes = JSON.parse(data);  //PARSE
          console.log("notes", notes);
          res.json(notes);  //RESPOND
        }
      });
      
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
