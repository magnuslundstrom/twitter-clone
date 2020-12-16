import React from 'react';
import ErrorMessage from './ErrorMessage';
import { capitalize } from '../../helpers/capitalize';

const InputLabel = ({ name, onChangeHandler, password, error }) => {
  return (
    <div className="field-wrapper">
      <div className={`field ${error ? 'field-error' : ''}`}>
        <label htmlFor={name} onChange={onChangeHandler}>
          {capitalize(name)}
        </label>
        <input
          type={password ? 'password' : 'text'}
          id={name}
          name={name}
          onChange={onChangeHandler ? (e) => onChangeHandler(e, name) : () => {}}
          autoComplete="off"
        ></input>
      </div>
      <div>{error && <ErrorMessage error={error} />}</div>
    </div>
  );
};

export default InputLabel;
