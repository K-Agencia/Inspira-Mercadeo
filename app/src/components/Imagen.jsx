import React, { useEffect } from 'react';

import '../css/imagen.css';

const Imagen = ({ data, arrValores }) => {

   useEffect(() => {
      
   }, [arrValores]);

   return (
      <div className='certificado' id='certificado'>

         <p className="nombre-reconocido">{data.reconocido.toUpperCase()}</p>

         <div className="certificado-valores">
            {arrValores[0] && <div className="imagenValor">
               <img src={arrValores[0].img_cert} alt="" />
            </div>}
            {arrValores[1] && <div className="imagenValor">
               <img src={arrValores[1].img_cert} alt="" />
            </div>}
            {arrValores[2] && <div className="imagenValor">
               <img src={arrValores[2].img_cert} alt="" />
            </div>}
         </div>

         <div className="container">
            <p className="mensaje">{data.mensaje}</p>
         </div>

         <p className="nombre-reconocedor">{data.reconocedor.toUpperCase()}</p>

      </div>
   );
};

export default Imagen;