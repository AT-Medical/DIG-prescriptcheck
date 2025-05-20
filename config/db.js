const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/prescriptcheck', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB verbunden');
    } catch (error) {
        console.error('MongoDB Fehler:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
