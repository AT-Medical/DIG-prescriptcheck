// backend/index.js – Einstiegspunkt für das PrescriptCheck-Backend

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/index');

dotenv.config({ path: '../../.env.production' });

const app = express();
app.use(express.json());

app.use('/api', authRoutes);

// MongoDB-Verbindung
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/prescriptcheck', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB verbunden');
}).catch(err => {
    console.error('MongoDB Fehler:', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`PrescriptCheck Backend läuft auf Port ${PORT}`);
});
