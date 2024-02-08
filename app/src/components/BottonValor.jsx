import React from 'react';
import '../css/BottonValor.css';

const BottonValor = ({ data, selected, handleChacked }) => {

   const handleChacked_h = () => {
      handleChacked(data.status);
   }
   return (
      <div className={`BottonValor ${selected && 'checked'}`} onClick={() => handleChacked_h()}>
         <img src={data.img} alt="" />
      </div>
   );
};

export default BottonValor;