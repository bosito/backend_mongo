const mongoose = require('mongoose');

const addConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONECTION)
        console.log('contect BD');
    } catch (error) {
        console.log(error);
    };
};

module.exports = { addConnection }