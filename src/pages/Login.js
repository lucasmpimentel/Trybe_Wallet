import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newUser } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, emailDispatch } = this.props;
    const { email } = this.state;
    /* dispatch(newUser(email)); */
    emailDispatch(email);
    history.push('/carteira');
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(({
      [name]: value,
    }), () => {
      const { email, password } = this.state;
      const MIN_PASSWORD = 6;
      const emailCheck = (email.includes('@') && email.endsWith('.com'));
      const buttonEnabler = (emailCheck && password.length >= MIN_PASSWORD);
      if (!buttonEnabler) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    });
  }

  render() {
    const { email, password, isDisabled } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            type="email"
            value={ email }
            id="email"
            name="email"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            value={ password }
            id="password"
            name="password"
            onChange={ handleChange }
          />
        </label>
        <button type="submit" disabled={ isDisabled }>Entrar</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (email) => dispatch(newUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
