import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { editProfileA } from '../store/actions/profile/editProfile';

const EditProfileModal = ({ displayHandler, name, email, description, editProfileA }) => {
  description = description || '';

  const [state, setState] = useState({
    firstName: name.split(' ')[0],
    lastName: name.split(' ')[1],
    email: email,
    description: description,
  });

  const onClickHandler = () => {
    editProfileA(state);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onClickHandler();
  };

  return ReactDOM.createPortal(
    <div className="edit-profile-modal-wrapper" onClick={() => displayHandler(false)}>
      <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
        <header>
          <div>
            <button onClick={() => displayHandler(false)}>
              <i className="fas fa-times"></i>
            </button>
            <h3>Edit profile</h3>
          </div>

          <button
            className="edit-profile-modal-save-btn"
            onClick={onClickHandler}
            disabled={name === state.name && email === state.email && state.description === description}
          >
            Save
          </button>
        </header>

        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            placeholder="First name"
            value={state.firstName}
            onChange={(e) => setState({ ...state, firstName: e.target.value })}
          ></input>
          <input
            type="text"
            placeholder="Last name"
            value={state.lastName}
            onChange={(e) => setState({ ...state, lastName: e.target.value })}
          ></input>
          <input
            type="text"
            placeholder="Email"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          ></input>
          <textarea
            rows="4"
            placeholder="Profile description"
            value={state.description}
            onChange={(e) => setState({ ...state, description: e.target.value })}
          ></textarea>
        </form>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

const mapStateToProps = ({
  auth: {
    user: { name, email },
  },
}) => ({
  name,
  email,
});

export default connect(mapStateToProps, { editProfileA })(EditProfileModal);
