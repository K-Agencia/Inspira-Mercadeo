import { useEffect, useState } from 'react';
import { Valores } from '../constants/Valores';
import BottonValor from './BottonValor';
import axios from 'axios';
import { urlApi } from '../constants/RoutersLinks';
import InputSelect from './InputSelect';
import '../css/Formulario.css';

const Formulario = ({ register, errors, watch, checked, handleChacked, isSubmitted }) => {

   const [listNombres, setListNombres] = useState([]);

   useEffect(() => {

      const getNombres = async () => {
         axios.get(`${urlApi}/nombres`)
            .then((response) => {
               setListNombres(response.data);
            })
            .catch((error) => {
               console.log(error)
            })
      }

      getNombres();

   }, []);

   return (
      <>
         <div className='Formulario'>
            <h1>FORMULARIO DE RECONOCIMIENTO</h1>

            <div className="inputTextName">
               <InputSelect
                  {...register('reconocido', {
                     required: "Debes seleccionar el nombre de una persona"
                  })}
                  label={"A quien se le reconoce"}
                  options={listNombres}
                  error={errors.reconocido}
               />
            </div>

            <h4>Seleccione hasta 3 valores que desea reconocer*</h4>
            <div className={`opciones ${errors.valores ? 'error' : ''}`}>
               <div className='row'>
                  {Valores.map((data, index) => {
                     return (
                        <BottonValor key={index} data={data} selected={checked[data.status]} handleChacked={handleChacked} />
                     )
                  })}
               </div>
               {isSubmitted && Object.keys(checked).filter(key => checked[key] === true) == 0 && <span className='error'>{"Debes seleccionar como mínimo un (1) valor a reconocer"}</span>}
            </div>

            <div className="mensageAdicional">
               <h4>Dedica un mensaje personalizado</h4>
               <textarea
                  {...register('mensaje', {
                     maxLength: {
                        value: 150,
                        message: "Límite de caracteres superado. 150 max."
                     }
                  })}
                  name="mensaje"
                  placeholder='150 max.'
                  autoComplete="off" />
               {isSubmitted && watch.mensaje.length > 150 && <span className='error'>{"Límite de caracteres superado. 150 max."}</span>}
               <p style={{ margin: 0 }}>{watch.mensaje.length}/150</p>
            </div>

            <div className="inputTextName">
               <InputSelect
                  {...register('reconocedor', {
                     required: "Debes seleccionar el nombre de una persona"
                  })}
                  label={"Quien hace el reconocimiento"}
                  options={listNombres}
                  error={errors.reconocedor}
               />
            </div>

            <input type="submit" value="Guardar" />
         </div>
      </>
   );
};

export default Formulario;