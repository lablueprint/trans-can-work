// reduxPersistConfig.js
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

function myReducer(state = { show: false }, action) {
  switch (action.type) {
    case 'SET_SHOW':
      return { ...state, show: action.payload };
    case 'persist/REHYDRATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}


export default persistReducer(persistConfig, myReducer);
