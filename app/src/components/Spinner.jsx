import '../css/Spinner.css';

const Spinner = () => {
   return (
      <div className='Spinner Overlay'>
         <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
   );
};

export default Spinner;