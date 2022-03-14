// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  expenses: [],
  currentBRLExpense: 0,
};

function wallet(state = INITIAL_STATE, action) {
  const value = state.currentBRLExpense;
  switch (action.type) {
  case 'NEW_EXPEND':
    return {
      ...state,
      expenses: [...state.expenses, { ...action.expense, id: state.expenses.length }],
      currentBRLExpense: value
      + Number(action.expense.value)
      * Number(action.expense.exchangeRates[action.expense.currency].ask),
    };
  default:
    return state;
  }
}

export default wallet;
