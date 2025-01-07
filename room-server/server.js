const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const ROOMS_FILE = path.join(__dirname, 'rooms.json');

// Utility function: Read rooms from file
async function readRooms() {
  try {
    const data = await fs.readFile(ROOMS_FILE, 'utf8');
    return JSON.parse(data || '[]'); // Якщо файл порожній, повертаємо порожній масив
  } catch (error) {
    throw new Error('Error reading file');
  }
}

// Utility function: Write rooms to file
async function writeRooms(rooms) {
  try {
    await fs.writeFile(ROOMS_FILE, JSON.stringify(rooms, null, 2));
  } catch (error) {
    throw new Error('Error writing file');
  }
}

// GET /rooms - отримання списку кімнат
app.get('/rooms', async (req, res) => {
  try {
    const rooms = await readRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// POST /rooms - додавання нової кімнати
app.post('/rooms', async (req, res) => {
  try {
    const newRoom = req.body;

    if (!newRoom.name || !newRoom.type || !newRoom.status) {
      return res.status(400).send({ message: 'Invalid room data' });
    }

    const rooms = await readRooms();
    newRoom.id = rooms.length ? rooms[rooms.length - 1].id + 1 : 1;
    rooms.push(newRoom);

    await writeRooms(rooms);
    res.status(201).send(newRoom);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

async function ensureFileExists() {
  try {
    await fs.access(ROOMS_FILE);
  } catch {
    await fs.writeFile(ROOMS_FILE, '[]'); // Створюємо файл з порожнім масивом
  }
}

ensureFileExists();

// Server стартує на порту
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
