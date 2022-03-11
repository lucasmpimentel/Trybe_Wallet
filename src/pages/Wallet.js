import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCurrencyQuote from '../services/getCurrencyQuote';

class Wallet extends React.Component {
  state= {
    expenses: 0,
    valueInput: 0,
    currencyInput: '',
    currencyQuote: [],
  }

  async componentDidMount() {
    const getCurrency = await getCurrencyQuote();
    this.setState({ currencyQuote: getCurrency });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const { handleChange } = this;
    const { email } = this.props;
    const { expenses, valueInput, currencyInput, currencyQuote } = this.state;
    const MAX_CHAR = 3;
    console.log(currencyQuote);
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
            Moeda
            <select
              data-testid="currency-input"
              id="currency-input"
              name="currencyInput"
              value={ currencyInput }
              onChange={ handleChange }
            >
              { Object.keys(currencyQuote)
                .filter((element) => (element.length === MAX_CHAR))
                .map((coin) => (
                  <option
                    key={ coin }
                    data-testid={ coin }
                  >
                    {coin}
                  </option>
                ))}
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

// APRENDI UM POUCO MAIS DE COMO FUNCIONA O OBJECT.KEYS NO SITE ABAIXO E FOI DE GRANDE AJUDA PARA CONCLUIR O REQ 5.
// https://acervolima.com/como-converter-um-object-em-um-array-de-pares-de-valores-chave-em-javascript/#:~:text=M%C3%A9todo%201%3A%20Neste%20m%C3%A9todo%2C%20usaremos,conforme%20descrito%20no%20exemplo%20abaixo.
