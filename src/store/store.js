import { compose, applyMiddleware} from 'redux';
import { createStore } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

// using middlewares as enahncements to log out state and observe actions
const middlewares = [ logger ];
//create corresponding enahancement 
const composedEnhancement = compose(applyMiddleware(...middlewares));

//creating store
export const store = createStore(rootReducer, undefined, composedEnhancement ) ;


