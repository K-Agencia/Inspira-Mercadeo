const fs = require('fs');
const path = require('path');
const { base64Image } = require('./base64Image');
const nodeHtmlToImage = require('node-html-to-image')

const createImage = async (req, res, next) => {
   console.log(2322);
   const {
      reconocido,
      valores,
      reconocedor,
      mensaje
   } = req.body;

   const nomv = new Date().getTime();

   const nombre = path.join(__dirname, "..", `upload/${nomv}.jpg`);

   const platilla = await base64Image(path.join(__dirname, '..', 'view/img/reconocimiento.jpg'));
   const _Light = fs.readFileSync(path.join(__dirname, '..', "view/font/Light.txt"));
   const _Bold = fs.readFileSync(path.join(__dirname, '..', "view/font/Bold.txt"));
   const _BoldItalic = fs.readFileSync(path.join(__dirname, '..', "view/font/BoldItalic.txt"));

   const valor1 = await base64Image(path.join(__dirname, '..', `view/img/valor_${valores[0].replace(" ", "_").toLowerCase()}_sc.svg`), "svg+xml");
   const valor2 = await base64Image(path.join(__dirname, '..', `view/img/valor_${valores[1].replace(" ", "_").toLowerCase()}_sc.svg`), "svg+xml");
   const valor3 = await base64Image(path.join(__dirname, '..', `view/img/valor_${valores[2].replace(" ", "_").toLowerCase()}_sc.svg`), "svg+xml");

   try {
      await nodeHtmlToImage({
         output: nombre,
         html: `
         <html>
   
            <head>
               <style>
                  @font-face {
                     font-family: "Light";
                     src: url(${_Light}) format('woff2');
                  }
   
                  @font-face {
                     font-family: "Bold";
                     src: url(${_Bold}) format('woff2');
                  }
   
                  @font-face {
                     font-family: "BoldItalic";
                     src: url(${_BoldItalic}) format('woff2');
                  }
   
                  body {
                     width: 1401px;
                     height: 1401px;
                     background: url('../img/certificado.svg');
                     position: relative;
                     font-family: 'ExtraLight' !important;
                  }
   
                  .certificado .content-nombre-reconocido {
                     width: 100%;
                  }
   
                  .certificado .container {
                     width: 100%;
                     text-align: center;
                     position: absolute;
                     top: 850px;
                  }
   
                  .certificado p.mensaje {
                     width: 70%;
                     margin: 0 auto;
                     font-family: "Bold";
                     font-size: 40px;
                     text-align: center;
                     color: #ff737a;
                  }
   
                  .certificado p.nombre-reconocido {
                     width: 100%;
                     margin: 0;
                     font-family: "BoldItalic";
                     font-size: 50px;
                     text-align: center;
                     position: absolute;
                     top: 1045px;
                     right: 300px;
                     color: #ffffff;
                  }
   
                  .certificado p.nombre-reconocedor {
                     width: 100%;
                     margin: 0;
                     font-family: "BoldItalic";
                     font-size: 50px;
                     text-align: center;
                     position: absolute;
                     top: 1120px;
                     right: 300px;
                     color: #ffffff;
                  }
   
                  .certificado .certificado-valores {
                     width: 100%;
                     margin: 0 auto;
                     text-align: center;
                     display: flex;
                     justify-content: center;
                     position: absolute;
                     top: 600px;
                     background: #ffc2c5;
                  }
   
                  .certificado .certificado-valores .imagenValor img {
                     height: 200px;
                     margin: 0 40px;
                  }
   
                  .certificado .certificado-valores .imagenValor p {
                     font-family: "Bold";
                     font-size: 20px;
                     color: var(--color-verde);
                  }
               </style>
            </head>
   
            <body>
   
            <img src="{{dataURI}}" alt="" />
   
               <div class='certificado' id='certificado'>
   
                  <p class="nombre-reconocido">{{reconocido}}</p>
   
                  <div class="certificado-valores">
                     <div class="imagenValor">
                        <img src="${valor1}" alt="" />
                     </div>
                     <div class="imagenValor">
                        <img src="${valor2}" alt="" />
                     </div>
                     <div class="imagenValor">
                        <img src="${valor3}" alt="" />
                     </div>
                  </div>
   
                  <div class="container">
                     <p class="mensaje">{{mensaje}}</p>
                  </div>
   
                  <p class="nombre-reconocedor">{{reconocedor}}</p>
   
               </div>
            </body>
   
            </html>
         `,
         content: {
            dataURI: platilla,
            reconocido: reconocido,
            reconocedor: reconocedor,
            mensaje: mensaje,
         }
      })

      req.body.urlIMG = nombre;

      next()
   } catch (error) {
      next();
   }

}

module.exports = createImage;