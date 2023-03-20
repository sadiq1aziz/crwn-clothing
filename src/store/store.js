import { compose, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore } from 'redux';
//import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
// using middlewares as enahncements to log out state and observe actions
//loggin only for lower regions
//thunk will pass action onto reducers after action is dispatched to update state
// once it confirms action is a function.
//const middlewares = [ process.env.NODE_ENV === 'development' && logger, thunk ].filter(Boolean);

// Can use either thunk or Saga for async state management / middlewares. Have commented out the
// Thunk implementation to use Saga

const sagaMiddleware = createSagaMiddleware();

const middlewares = [ process.env.NODE_ENV === 'development' && logger, sagaMiddleware ].filter(Boolean);

const  persistCongfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}


const persistedReducer = persistReducer( persistCongfig, rootReducer);

//use compose that utilizes redux dev tools
const composeEnhancers = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//create corresponding enahancement 
const composedEnhancement = composeEnhancers(applyMiddleware(...middlewares));

//creating store
export const store = createStore(persistedReducer, undefined, composedEnhancement ) ;


//Initiate Saga
sagaMiddleware.run(rootSaga);


export const persistedStore = persistStore(store);


