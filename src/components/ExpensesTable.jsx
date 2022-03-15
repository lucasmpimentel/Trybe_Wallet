import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { oneOfType } from 'prop-types';

class Table extends Component {
  handleDeleteClick = (event) => {
    console.log(event);
  }

  render() {
    const { expenses } = this.props;
    const { handleDeleteClick } = this;
    return (
      <table>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          { expenses.length === 0 && (
            <tr>
              <td colSpan="9">
                Desculpe, mas ainda não existem despesas salvas.
              </td>
            </tr>
          )}
          { expenses.length !== 0 && (
            expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>
                  {expense.description}
                </td>
                <td>
                  {expense.tag}
                </td>
                <td>
                  {expense.method}
                </td>
                <td>
                  {parseFloat(expense.value).toFixed(2)}
                </td>
                <td>
                  {expense.exchangeRates[expense.currency].name}
                </td>
                <td>
                  {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>
                  {parseFloat(Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
                </td>
                <td>
                  Real
                </td>
                <td className="table-edition-buttons">
                  <button type="button" onClick="">Editar</button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ handleDeleteClick }
                  >
                    Excluir
                  </button>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ])).isRequired,
};
