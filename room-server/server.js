const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const ROOMS_FILE = './rooms.json';

app.get('/rooms', (req, res) => {
  fs.readFile(ROOMS_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send({ message: 'Error reading file' });
    res.send(JSON.parse(data));
  });
});

app.post('/rooms', (req, res) => {
  const newRoom = req.body;
  fs.readFile(ROOMS_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send({ message: 'Error reading file' });

    const rooms = JSON.parse(data);
    newRoom.id = rooms.length ? rooms[rooms.length - 1].id + 1 : 1;
    rooms.push(newRoom);

    fs.writeFile(ROOMS_FILE, JSON.stringify(rooms, null, 2), (err) => {
      if (err) return res.status(500).send({ message: 'Error writing file' });
      res.status(201).send(newRoom);
    });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
