import React from 'react';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();

  return (
    <button onClick={() => history.goBack()}>
      <i className="fas fa-arrow-left"></i>
    </button>
  );
};

export default BackButton;
