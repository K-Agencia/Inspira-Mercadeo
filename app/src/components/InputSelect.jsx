import React from 'react';

const InputSelect = React.forwardRef(({ name, label, defaultValue, onChange, onBlur, options, error }, ref) => (
  <div className='InputSelect'>
    {/* : */}
    <label htmlFor="reconocido">{label}:</label><br />
    <select
      ref={ref}
      name={name}
      id={name}
      onChange={onChange}
      onBlur={onBlur}
      className={`selectNombre ${!error ? "" : "error"}`}
      defaultValue={defaultValue}
    >
      <option value="" disabled>Selecciona un nombre</option>
      {options.map((item, index) => (
        <option key={index} value={item.nombres}>{item.nombres}</option>
      ))}
    </select><br />
    {error && <span className='error'>{error.message}</span>}
  </div>

));

export default InputSelect;