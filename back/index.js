const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const { mongoose } = require('./db');

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:8100' }));

app.use('/users', require('./rutas/routes'));


app.listen(3000, () => {
    console.log("Server corriendo en el puerto ", app.get('port'));
});