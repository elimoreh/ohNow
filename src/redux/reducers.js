import { combineReducers } from 'redux';

const initialState = {
    loggedIn: false,
    UserName: null,
    UserId: null,
};

const initialReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'firstAction':
      return Object.assign({}, state, { counter: action.payload });
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  initialReducer,
});

export default rootReducer;
