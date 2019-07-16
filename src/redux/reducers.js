import { combineReducers } from 'redux';

const authState = {
    loggedIn: false,
    UserName: null,
    UserId: null,
};

const authReducer = (state = authState, action) => {
  switch (action.type) {
    case 'firstAction':
      return Object.assign({}, state, { loggedIn: action.payload });
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;
