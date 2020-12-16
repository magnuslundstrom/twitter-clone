import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div>
      <p className="error-message">
        <i className="fas fa-exclamation-circle"></i> {error}
      </p>
    </div>
  );
};

export default ErrorMessage;
