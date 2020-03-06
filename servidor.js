const express = require('express');
const app = express;

app.length('/', (req,res) => res.send('Hola mundo!'));
app.listen(port ,()=> console.log ('El servicio se esta ejecutando en el puerto:' + port));