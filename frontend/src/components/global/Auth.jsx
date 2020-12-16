import React from 'react';
import { connect } from 'react-redux';
import { loginA } from '../../store/actions/auth/login';

class Auth extends React.Component {
  state = { loaded: false };
  async componentDidMount() {
    const res = await fetch(`/api/auto-login.php`);
    if (res.ok) {
      const data = await res.json();
      this.props.loginA(data);
    }
    this.setState({ loaded: true });
  }

  render() {
    return (this.state.loaded && this.props.children) || <p>Loading</p>;
  }
}

export default connect(null, { loginA })(Auth);
