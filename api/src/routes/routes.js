const express = require('express');
const { selectNombres, seleccionarCorreo, insertRegistro, insertRegistroPaises } = require('../services/database.js');
const createImage = require('../services/createImage.js');
const sendMail = require('../services/emailer.js');
const eliminarImagen = require('../services/eliminarImagen.js');
const upload = require('../services/multer.js');

const app = express();

// app.get('/nombres', (req, res) => res.send("Server Run, Ok!"));
app.get('/nombres', selectNombres);
// app.post('/reconocimiento', insertRegistro, seleccionarCorreo, sendMail, eliminarImagen);
app.post('/reconocimiento', upload, insertRegistro, seleccionarCorreo, sendMail, eliminarImagen);
// app.post('/reconocimiento', insertRegistro, seleccionarCorreo, createImage);
app.post('/reconocimiento_paises', insertRegistroPaises);
// app.post('/ejemplo', upload, (req, res) => {
//   console.log(JSON.parse(req.body.data));
//   console.log(req.file);
//   // do stuff with file
// });
// app.post('/ejemplo', upload, insertRegistro);

module.exports = app;