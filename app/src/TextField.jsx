/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from 'react';

export default function TextField({ id, name, type, value, handleChange }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  function getClassName() {
    if (isHovered || isFocused) return 'inputFocused labelText';
    return 'labelText';
  }

  const commonProps = {
    name: name,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onChange: handleChange
  };

  return (
    <div key={id} className='textField'>
      <label>
        //
        <span className={getClassName()}>{name}</span>
        <h6>{id}</h6>
      </label>
      
      { type === 'input'
        ? <input {...commonProps} ></input>
        : <textarea {...commonProps}></textarea>
      }
    </div>
  );
}