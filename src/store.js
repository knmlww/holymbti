import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './reducers/saveScore';

const store = configureStore({
  reducer: scoreReducer,
});

export default store;