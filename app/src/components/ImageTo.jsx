import '../css/ImageTo.css';

const ImageTo = ({ getValues, imgValores }) => {

  const { reconocido, reconocedor, mensaje } = getValues;

  return (
    <div className='ImageTo' id='certificado'>
      <div className="images">
        {imgValores.map(({ valor, img_cert }, index) => (
          <div key={index} className="img_valor">
            <img src={img_cert} alt="" />
            <p>{valor}</p>
          </div>

        ))}
      </div>
      <div className="container">
        <h4>{mensaje}</h4>
        <div className="nombres">
          <h1>{reconocido}</h1>
          <h1>{reconocedor}</h1>
        </div>
      </div>
    </div>
  );
};

export default ImageTo;