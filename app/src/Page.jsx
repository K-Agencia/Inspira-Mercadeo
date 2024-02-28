// import { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import Formulario from './components/Formulario';
import Informacion from './components/Informacion';
import { ImagenesGenerales } from './constants/Imagenes';

import ImageTo from './components/ImageTo';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Valores } from './constants/Valores';
import Spinner from './components/Spinner';
import axios from 'axios';
import { urlApi } from './constants/RoutersLinks';
import Swal from 'sweetalert2';

import './css/App.css';

function Page() {

   const { register, handleSubmit, formState: { errors, isSubmitted }, reset, watch } = useForm({
      defaultValues: {
         reconocido: '',
         valores: [],
         reconocedor: '',
         mensaje: ''
      }
   })

   const [imgValores, setImgValores] = useState([]);
   const [descargar, setDescargar] = useState(false);
   const [loading, setLoading] = useState(false);

   function filterNode(node) {
      if (node instanceof Text) {
         return true;
      }
      return [
         "div",
         "span",
         "p",
         "i",
         "strong",
         "main",
         "aside",
         "article",
         "pre",
         "code",
         "time",
         "address",
         "header",
         "footer",
         "img"
      ].includes(node.tagName.toLowerCase()) || /^h[123456]$/i.test(node.tagName);
   }

   const downloadImage = async () => {

      setDescargar(true);

      return await new Promise((resolve) => {

         setTimeout(() => {
            htmlToImage.toBlob(document.getElementById('certificado'))
               .then((dataUrl) => {
                  // console.log(dataUrl);
                  //          // var link = document.createElement('a');
                  //          // link.download = `${new Date().getTime()}-inspira.jpg`;
                  //          // link.href = dataUrl;
                  //          // link.click();
                  //          console.log(dataUrl);
                  resolve(dataUrl)
               });
         }, 1000);
         // setTimeout(() => {
         //    htmlToImage.toJpeg(document.getElementById('certificado'), { quality: 1, filter: filterNode, bgcolor: "#fff" })
         //       .then((dataUrl) => {
         //          // var link = document.createElement('a');
         //          // link.download = `${new Date().getTime()}-inspira.jpg`;
         //          // link.href = dataUrl;
         //          // link.click();
         //          console.log(dataUrl);
         //          resolve(dataUrl)
         //       });
         // }, 1000);
      })
         .then((data) => {
            return data
         })
         .finally(() => {
            setDescargar(false);
         });
   }

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

   const onSubmit = async (data) => {
      setLoading(true);

      const valor = Object.keys(checked).filter(key => checked[key] === true);
      data.valores = valor;

      const valoresFiltrados = Valores.filter(item => valor.includes(item.status));
      setImgValores(valoresFiltrados.map(({ img_cert, valor }) => ({ img_cert, valor })));

      const imgCertificado = await downloadImage();

      const formData = new FormData();
      formData.append("img", imgCertificado);
      formData.append("data", JSON.stringify(data));
      // data.img = imgCertificado;

      axios({
         url: `${urlApi}/reconocimiento`,
         // url: `${urlApi}/ejemplo`,
         method: "post",
         data: formData
      })
         .then((response) => {
            resetFormComp();
            console.log(response);
            Swal.fire({
               title: 'Muchas gracias por tu reconocimiento',
               icon: 'success',
               html:
                  'En los próximos minutos, tu reconocimiento llegará por correo electrónico a la persona que reconociste',
               focusConfirm: true,
               confirmButtonText: 'Ok!',
            })
         })
         .catch((error) => {
            Swal.fire({
               title: '¡Ups! Tenemos un error',
               icon: 'error',
               html:
                  'Vuelve a intentarlo más tarde',
               focusConfirm: true,
               confirmButtonText: 'Ok!',
            })
            console.log(error);
         }).finally(() => {
            setLoading(false);
         })
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


   return (
      <div className="App">
         <Informacion />
         <div className="seccionForm">
            <form id='formReconocimiento' onSubmit={handleSubmit(onSubmit)}>
               <Formulario register={register} errors={errors} watch={watch()} checked={checked} handleChacked={handleChacked} isSubmitted={isSubmitted} />
            </form>
            <div className='logo_final'>
               <img src={ImagenesGenerales.logo_colgate_palmolive} alt="" />
            </div>
         </div>
         {/* {JSON.stringify(getValues)} */}
         {loading && <Spinner />}
         {descargar && <ImageTo getValues={watch()} imgValores={imgValores} />}
      </div>
   );
}

export default Page;
