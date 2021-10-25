import {Card} from '../models';

function filterOutCard(state: Card[], id: string | undefined = '') {
  return id == '' ? state : state.filter((item) => item.id !== id);
}

function addCard(state: Card[], name = '') {
  const localState = [...state];
  localState.push(new Card({name}));
  return localState;
}

function cardIncrement(state: Card[], id: string = '') {
  const itm = state.find((item: Card) => item.id == id);
  itm?.increment();
  return state;
}

function cardDecrement(state: Card[], id: string = '') {
  const itm = state.find((item: Card) => item.id == id);
  itm?.decrement();
  if ((itm?.count ?? 0) < 1) {
    return filterOutCard(state, id);
  } else {
    return state;
  }
}

const DeckStore = (state: Card[], action: {
    type: string,
    name?: string,
    id?: string
}) => {
  if ( typeof state === 'undefined') {
    if (localStorage.getItem('DeckStore')) {
      const parsed = JSON.parse(localStorage.getItem('DeckStore') ?? '');
      state = parsed.map((item: any) => new Card(item));
    } else {
      state = [];
    }
  }
  switch (action.type) {
    case 'CARD_REMOVED':
      return filterOutCard(state, action?.id);
    case 'CARD_ADDED':
      return addCard(state, action?.name);
    case 'CARD_COUNT_INCREMENT':
      return cardIncrement(state, action?.id);
    case 'CARD_COUNT_DECREMNT':
      return cardDecrement(state, action?.id);
  }
  return state;
};

export default DeckStore;
