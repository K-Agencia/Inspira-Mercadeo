const pool = require('../config/conexionDB.js');

const selectNombres = (req, res, next) => {

   // const query = `SELECT idUsuarios, nombres FROM usuarios_mercadeo_col`;
   const query = `SELECT idUsuarios, nombres FROM usuarios_mercadeo_col ORDER BY nombres ASC`;

   pool.getConnection((err, connection) => {

      if (err) next(err);

      connection.query(query, (error, results, fields) => {
         if (error) next(error);
         res.send(results);
         connection.release();
      });
   })
}

const insertRegistro = (req, res, next) => {

   const data = JSON.parse(req.body.data);

   const {
      reconocido,
      valores,
      reconocedor,
      mensaje
   } = data;

   const query = `INSERT INTO reconocimientos_mercadeo (reconocido, reconocedor, valor_1, valor_2, valor_3, description) VALUES (?, ?, ?, ?, ?, ?)`;

   pool.getConnection((err, connection) => {

      if (err) next(err);

      connection.query(query, [reconocido, reconocedor, valores[0], valores[1], valores[2], mensaje], (error, results, fields) => {
         if (error) {
            next(error);
         } else {
            console.log('insertRegistro');
            req.body = data;
            next();
         }
         connection.release();

      });
   })
}

const insertRegistroPaises = (req, res, next) => {

   const {
      reconocido,
      valores,
      reconocedor,
      mensaje,
      area
   } = req.body;

   // // reconocido reconocedor valor1 valor2 valor3 mensaje area(pais)
   const query = `INSERT INTO reconocimientos_mercadeo_paises VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, NULL)`

   pool.getConnection((err, connection) => {

      if (err) next(err);

      connection.query(query, [reconocido, reconocedor, valores[0], valores[1], valores[2], mensaje, area], (error, results, fields) => {

         if (err) next(err);

         next();

         connection.release();
      });
   })
}

const seleccionarCorreo = (req, res, next) => {
   const {
      reconocido
   } = req.body;

   const queryCorreo = `SELECT correos FROM usuarios_mercadeo_col WHERE nombres=?`;

   pool.getConnection((err, connection) => {

      if (err) next(err);

      connection.query(queryCorreo, [reconocido], (error, results, fields) => {

         if (error) {
            next(error);
         } else {
            console.log('seleccionarCorreo');
            req.body.correo = results[0].correos;
            next();
         }
         connection.release();
      });
   })
}

module.exports = {
   selectNombres,
   seleccionarCorreo,
   insertRegistro,
   insertRegistroPaises
}