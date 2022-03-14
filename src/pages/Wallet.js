import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCurrencyQuote from '../services/getCurrencyQuote';
import { saveExpendThunk } from '../actions';
import Header from '../components/Header';

class Wallet extends React.Component {
  state= {
    description: '',
    value: '',
    currency: 'USD',
    currencyQuote: [],
    method: '',
    tag: '',
  }

  async componentDidMount() {
    const getCurrency = await getCurrencyQuote();
    this.setState({ currencyQuote: getCurrency });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const {
      description,
      value,
      currency,
      method,
      tag,
    } = this.state;
    const exchangeRates = {};
    const currentExpense = {
      description,
      value,
      currency,
      method,
      tag,
      exchangeRates,
    };
    dispatch(saveExpendThunk(currentExpense));
    this.setState({
      description: '',
      value: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
  }

  render() {
    const {
      /* currentExpenses, */
      value,
      currency,
      currencyQuote,
      description,
      method,
      tag,
    } = this.state;
    const { handleChange, handleSubmit } = this;
    const MAX_CHAR = 3;

    return (
      <main>
        <Header />
        <form onSubmit={ handleSubmit }>
          <label htmlFor="description-input">
            Descrição
            <input
              data-testid="description-input"
              id="description-input"
              type="text"
              name="description"
              placeholder="Com o que gastou?"
              value={ description }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="value-input">
            Valor
            <input
              data-testid="value-input"
              id="value-input"
              type="number"
              placeholder="Quanto gastou?"
              name="value"
              value={ value }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              data-testid="currency-input"
              id="currency-input"
              name="currency"
              value={ currency }
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
          <select
            data-testid="method-input"
            id="method-input"
            name="method"
            placeholder="Tipo de Pagamento"
            value={ method }
            onChange={ handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            id="tag-input"
            name="tag"
            placeholder="Categoria"
            value={ tag }
            onChange={ handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
      </main>
    );
  }
}

export default connect()(Wallet);

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// APRENDI UM POUCO MAIS DE COMO FUNCIONA O OBJECT.KEYS NO SITE ABAIXO E FOI DE GRANDE AJUDA PARA CONCLUIR O REQ 5.
// https://acervolima.com/como-converter-um-object-em-um-array-de-pares-de-valores-chave-em-javascript/#:~:text=M%C3%A9todo%201%3A%20Neste%20m%C3%A9todo%2C%20usaremos,conforme%20descrito%20no%20exemplo%20abaixo.
