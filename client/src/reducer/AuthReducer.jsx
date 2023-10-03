const authInitState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  const { type, payload } = action;
  let newState;
  switch (type) {
    case "SET_AUTH":
      newState = {
        ...state,
        user: payload.user,
        isLoading: false,
        isAuthenticated: payload.isAuthenticated,
      };
      break;
    case "CLEAR_AUTH":
      newState = {
        ...state,
        user: null,
        isLoading: true,
        isAuthenticated: false,
      };
      break;
    default:
      newState = { ...state };
      break;
  }
  return newState;
};

export { authReducer, authInitState };
