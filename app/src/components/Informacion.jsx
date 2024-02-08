import { ImagenesGenerales } from '../constants/Imagenes';

import { Valores } from '../constants/Valores';
import '../css/Informacion.css';

const Informacion = () => {
   return (
      <>
         <div className='Informacion'>
            <div className="nav_header">
               <img className='logo_inspira' src={ImagenesGenerales.logo} alt="" />
               <img className='logo_inspira' src={ImagenesGenerales.logo_colgate_palmolive} alt="" />
            </div>
            <div className="container">

               <div className='session'>
                  <img src={ImagenesGenerales.logo_inspira} alt="" />
               </div>

               <div className='session'>
                  <img src={ImagenesGenerales.circulo_discontinuo} alt="" />
               </div>

            </div>
         </div>
         <div className="seccion-valores">
            <div className='caja-valores'>
               <p className="texto">Cada logro tiene consigo valores basados en FEED y los nuevos principios de liderazgo:</p>
               <div className="valores">
                  {Valores.map(({ info_img }, index) => (
                     <img key={index} src={info_img} alt="" />
                  ))}
               </div>
            </div>
         </div>
         <div className='Banner'>
            <div className="text">
               <p>Reconoce a alguien que con su esfuerzo está haciendo la diferencia y es un modelo que influye.</p>
               <p>Es indispensable que los nombres sean escritos correctamente para darle validez al reconocimiento, no usar apodos, ni diminutivos.</p>
            </div>
         </div>
      </>
   );
};

export default Informacion;