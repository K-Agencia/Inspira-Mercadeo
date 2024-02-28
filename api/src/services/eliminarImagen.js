const fs = require('fs');
const path = require('path');

const eliminarImagen = (req, res, next) => {

   const imgName = req.file.path;

   try {
      fs.rmSync(imgName);
      // res.send(true)
      console.log('Archivo eliminado');
   } catch (error) {
      console.log(error);
   }

}

module.exports = eliminarImagen;