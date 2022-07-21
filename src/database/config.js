const mongoose = require('mongoose');

const addConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONECTION)
        console.log('contect BD');
    } catch (error) {
        console.log(error);
    };
};

module.exports = { addConection }