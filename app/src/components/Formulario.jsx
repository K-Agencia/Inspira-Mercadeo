import { useEffect, useState } from 'react';

import { Valores } from '../constants/Valores';
// import { useForm } from '../hooks/useForm';

import BottonValor from './BottonValor';
import Spinner from './Spinner';


import '../css/Formulario.css';
import axios from 'axios';
import { urlApi } from '../constants/RoutersLinks';
import Swal from 'sweetalert2';
import { ImagenesGenerales } from '../constants/Imagenes';
import { useForm } from 'react-hook-form';
import InputSelect from './InputSelect';

const Formulario = () => {

   const { register, handleSubmit, formState: { errors }, reset, } = useForm({
      defaultValues: {
         reconocido: '',
         valores: [],
         reconocedor: '',
         mensaje: ''
      }
   })

   const [loading, setloading] = useState(false);

   const [listNombres, setListNombres] = useState([]);

   const [checked, setChecked] = useState({
      innovacion: false,
      enfoque: false,
      empoderamiento: false,
      iniciativa_digital: false,
      claro_valiente: false,
      fomenta_curiosidad: false,
      construye_conﬁanza: false,
      promueve_cambio: false,
      pasion: false,
      escucha_activa: false
   });



   const contador = async () => {
      let cont = 0;

      for (const property in checked) {
         if (checked[property] === true) {
            cont += 1;
         }
      }

      return cont;
   }

   const handleChacked = async (valor) => {

      let cantidad = await contador();

      if (!checked[valor]) {
         if (cantidad < 3) {
            setChecked({
               ...checked,
               [valor]: true
            })
         }
      } else {
         setChecked({
            ...checked,
            [valor]: false
         })
      }
   }


   const resetFormComp = () => {
      reset();
      setChecked({
         innovacion: false,
         enfoque: false,
         empoderamiento: false,
         iniciativa_digital: false,
         claro_valiente: false,
         fomenta_curiosidad: false,
         construye_conﬁanza: false,
         promueve_cambio: false,
         pasion: false,
         escucha_activa: false
      })
   }

   const respuestaAlerta = () => {

      Swal.fire({
         title: 'Muchas gracias por tu reconocimiento',
         icon: 'success',
         html:
            'En los próximos minutos, tu reconocimiento llegará por correo electrónico a la persona que reconociste',
         focusConfirm: true,
         confirmButtonText: 'Ok!',
      })

      resetFormComp();

   }

   const onSubmit = (data) => {
      setloading(true)
      data.valores = Object.keys(checked).filter(key => checked[key] === true);

      axios({
         url: `${urlApi}/reconocimiento`,
         method: "post",
         data
      })
         .then((response) => {
            respuestaAlerta();
            console.log(response);
         })
         .catch((error) => {
            console.log(error)
         }).finally(() => {
            setloading(false);
         })
   }

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
            <form id='formReconocimiento' onSubmit={handleSubmit(onSubmit)}>
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
                  {errors.valores && <span className='error'>{errors['valores']}</span>}
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
            </form>

            {loading === true && <Spinner />}
            {/* {responseApi === true && respuestaAlerta()} */}

         </div>
         <div className='logo_final'>
            <img src={ImagenesGenerales.logo_colgate_palmolive} alt="" />
         </div>

      </>
   );
};

export default Formulario;