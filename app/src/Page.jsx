import { useState } from 'react';
import domtoimage from 'dom-to-image';
import Formulario from './components/Formulario';
import Informacion from './components/Informacion';
import Imagen from './components/Imagen';

import './css/App.css';
import { Valores } from './constants/Valores';

function Page() {

   const [form, setForm] = useState({
      reconocido: '',
      valores: [],
      reconocedor: '',
      mensaje: ''
   });
   const [arrValores, setArrValores] = useState([]);
   const [descargar, setDescargar] = useState(false);

   const urlImgValores = async (checked) => {

      let arrFoto = [];
      for (const property in checked) {
         if (checked[property] === true) {
            let res = Valores.filter((elem) => elem.status === property)
            arrFoto.push(res[0])
         }
      }

      setArrValores(arrFoto);
   }

   const downloadImage = async () => {

      setDescargar(true);

      const data = await new Promise((resolve) => {

         setTimeout(() => {
            domtoimage.toJpeg(document.getElementById('certificado'), { quality: 0.95 })
               .then(function (dataUrl) {
                  var link = document.createElement('a');
                  link.download = `${new Date().getTime()}-inspira.jpg`;
                  link.href = dataUrl;
                  // link.click();
                  resolve(dataUrl);

                  setTimeout(() => {
                     setDescargar(false);
                  }, 1000);

               });
         }, 1000);
      });

      return (data);
   }


   return (
      <div className="App">
         <Informacion />
         <div className="seccionForm">
            <Formulario urlImgValores={urlImgValores} setForm={setForm} downloadImage={downloadImage} />
         </div>
         {descargar && <Imagen arrValores={arrValores} data={form} />}
      </div>
   );
}

export default Page;
