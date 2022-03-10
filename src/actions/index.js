export const NEW_USER = 'NEW_USER';
export const NEW_EXPEND = 'NEW_EXPEND';

export const newUser = (email) => ({
  type: NEW_USER,
  email,
});

export const newExpend = (state) => ({
  type: NEW_EXPEND,
  state,
});
