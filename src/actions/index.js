import getCurrencyQuote from '../services/getCurrencyQuote';

export const NEW_USER = 'NEW_USER';
export const NEW_EXPEND = 'NEW_EXPEND';
export const SAVE_EXPEND = 'SAVE_EXPEND';

export const newUser = (email) => ({
  type: NEW_USER,
  email,
});

export const newExpend = (state) => ({
  type: NEW_EXPEND,
  expense: state,
});

export const saveExpendThunk = (expense) => (dispatch) => {
  getCurrencyQuote()
    .then((response) => {
      expense.exchangeRates = response;
      dispatch(newExpend(expense));
    });
};
