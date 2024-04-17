import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './reducers/saveScore';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key : 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig,scoreReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})
/*
const persistor = persistStore(store);
*/

export default store;
export const persistor = persistStore(store);