import React, { useState } from 'react';
import InputLabel from '../utils/InputLabel';
import ErrorMessage from '../utils/ErrorMessage';
import useForm from '../hooks/useForm';
import { validateEmail } from '../../helpers/validateEmail';
import Success from './Success';

const initState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  errors: {
    email: '',
    general: '',
  },
};

const SignUpFlow = ({ setDisplay }) => {
  const [formState, onChangeHandler, formData, setErrors] = useForm(initState);
  const [page, setPageHandler] = useState(0);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/sign-up.php', {
      method: 'POST',
      body: formData,
    });
    if (res.status !== 200) {
      const data = await res.json();
      setErrors(data);
      return;
    }
    setPageHandler(1);
    setTimeout(() => {
      setDisplay(false);
    }, 3000);
  };

  return (
    <div id="signupflow" onClick={() => setDisplay(false)}>
      <div id="box" onClick={(e) => e.stopPropagation()}>
        {page === 0 && (
          <div>
            <div>
              <form onSubmit={onSubmitHandler}>
                <div className="header">
                  <p></p>
                  <p>Twitter</p>
                  <button
                    disabled={
                      formState.firstName.length < 2 ||
                      formState.lastName.length < 2 ||
                      !validateEmail(formState.email) ||
                      formState.password.length < 5
                    }
                  >
                    Submit
                  </button>
                </div>
                <h2>Create your account</h2>
                <InputLabel name={'firstName'} onChangeHandler={onChangeHandler} />
                <p style={{ marginTop: '-15px' }}>{formState.firstName.length || 0}/50</p>
                <InputLabel name={'lastName'} onChangeHandler={onChangeHandler} />
                <p style={{ marginTop: '-15px' }}>{formState.lastName.length || 0}/50</p>
                <div></div>
                <InputLabel name={'email'} onChangeHandler={onChangeHandler} error={formState.errors.email} />
                <InputLabel name={'password'} onChangeHandler={onChangeHandler} password />
                {formState.errors.general && <ErrorMessage error={formState.errors.general} />}
              </form>
            </div>
          </div>
        )}
        {page === 1 && (
          <div>
            <p>hej</p>
            <Success />{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpFlow;
