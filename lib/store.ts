// store.ts
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './features/blog/blogSlice';
import aboutReducer from './features/about/aboutSlice';
import { persistReducer, persistStore, 
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

// Combine all reducers
const rootReducer = combineReducers({
  blog: blogReducer,
  about: aboutReducer, // Assuming you have an aboutReducer
});

// Define persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // ✅ Ignore redux-persist action types
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

// Persistor for <PersistGate>
export const persistor = persistStore(makeStore());

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
