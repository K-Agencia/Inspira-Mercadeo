const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3102;

const rutas = require(__dirname + '/src/routes/routes.js');
const { errorHandling } = require('./src/services/errorHandling.js');

app.use(morgan('dev'));

app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(express.json({limit: '50mb'}));

app.use(express.static('public'));

app.use(rutas);
app.use(errorHandling);

app.listen(PORT, () => {
   console.log(`Server on port ${PORT}`);
})