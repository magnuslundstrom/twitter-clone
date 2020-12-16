import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { loginA } from '../store/actions/auth/login';
import SignUpFlow from '../components/signupFlow/SignUpFlow';
import IndexFooter from '../components/global/IndexFooter';
import InputLabel from '../components/utils/InputLabel';
import useForm from '../components/hooks/useForm';

const initState = {
  email: '',
  password: '',
  errors: {
    email: '',
    password: '',
    general: '',
  },
};

const Index = ({ loginA }) => {
  const formRef = useRef(null);
  const [formState, onChangeHandler, formData] = useForm(initState);
  const [displayFlow, setDisplayFlow] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/log-in.php`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) return console.log(await res.text());
    const { user } = await res.json();
    loginA(user);
  };

  return (
    <div className="login-page-wrapper">
      {displayFlow && <SignUpFlow setDisplay={setDisplayFlow} />}
      <div className="login-page">
        <div id="left">
          <div className="inner-wrapper">
            <div>
              <i className="fas fa-search"></i>
              <p>Follow your interests.</p>
            </div>
            <div>
              <i className="fas fa-user-friends"></i>
              <p>Hear what people are talking about.</p>
            </div>
            <div>
              <i className="far fa-comment"></i>
              <p>Join the conversation.</p>
            </div>
          </div>
        </div>
        <div id="right">
          <form onSubmit={onSubmitHandler} ref={formRef}>
            <InputLabel name="email" onChangeHandler={onChangeHandler} error={formState.errors.email} />
            <InputLabel name="password" password onChangeHandler={onChangeHandler} error={formState.errors.password} />
            <button>Log in</button>
          </form>

          <div className="index-cta">
            <h1>See what's happening in the world right now</h1>
            <p>Join Twitter today.</p>
            <button onClick={() => setDisplayFlow(true)}>Sign up</button>
            <button>Log in</button>
          </div>
        </div>
      </div>
      <IndexFooter />
    </div>
  );
};

export default connect(null, { loginA })(Index);
