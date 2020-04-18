const mongoose = require('mongoose');

const URL = 'mongodb://localhost/dualgames';

mongoose.connect(URL)
    .then(db => console.log("La base de datos esta conectada"))
    .catch(err => console.error(err))


module.exports = mongoose;