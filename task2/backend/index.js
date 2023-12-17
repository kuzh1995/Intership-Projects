const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const Post = require('./models/post');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

mongoose.connect('mongodb+srv://kuzhpixel:axbwJWdQfYudmY29@kuzhpixel.evpwqky.mongodb.net/Intership', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use('/api/posts', require('./routes/post')(upload));
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
