import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  state= {
    expenses: 0,
    valueInput: 0,
    currencyInput: '',
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { handleChange } = this;
    const { email } = this.props;
    const { expenses, valueInput, currencyInput } = this.state;

    return (
      <main>
        <header className="header-wallet">
          <div className="container-email-expenses">
            <h5 data-testid="email-field">{ `Email: ${email}` }</h5>
            <p data-testid="total-field">{ `Despesa total: ${expenses}`}</p>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              data-testid="value-input"
              id="value-input"
              type="number"
              name="valueInput"
              value={ valueInput }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency-input"
              name="currencyInput"
              value={ currencyInput }
              onChange={ handleChange }
            >
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>ARS</option>
            </select>

          </label>
        </form>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
