import DeckStore from './DeckStore';
import BinStore from './BinStore';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const reducers = combineReducers({DeckStore, BinStore});

const composedEnhancer = composeWithDevTools(
    // Add whatever middleware you actually want to use here
    applyMiddleware(),
    // other store enhancers if any
);

const store = createStore(reducers, composedEnhancer);

function localStore() {
  const currentDeck = store.getState().DeckStore;
  localStorage.setItem('DeckStore', JSON.stringify(currentDeck));
  const currentBin = store.getState().BinStore;
  localStorage.setItem('BinStore', JSON.stringify(currentBin));
}

store.subscribe(localStore);

export default store;
