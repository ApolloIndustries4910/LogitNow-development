
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './Reducers/index';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whiteList:['Projects','Machines']
};
const persistedReducer = persistReducer(persistConfig, Reducers);
const store = createStore(persistedReducer,{},applyMiddleware(ReduxThunk) );
let persistor = persistStore(store);
export  {
    store,
    persistor,
};
// const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
// export default store;