export const isUserAuth = state => state.auth.isAuth;
export const getUserName = state => {
  if (state.auth.email) return state.auth.email.split('@')[0];
}