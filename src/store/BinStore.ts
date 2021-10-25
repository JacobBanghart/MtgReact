import {CardBin} from '../models';

function filterOutCardBin(state: CardBin[], id: string | undefined = '') {
  return id == '' ? state : state.filter((item) => item.id !== id);
}

function addCardBin(state: CardBin[], name = '') {
  const localState = [...state];
  localState.push(new CardBin({name}));
  return localState;
}


function cardBinIncrement(state: CardBin[], id: string = '') {
  const itm = state.find((item: CardBin) => item.id == id);
  itm?.increment();
  return state;
}

function cardBinDecrement(state: CardBin[], id: string = '') {
  const itm = state.find((item: CardBin) => item.id == id);
  itm?.decrement();
  return state;
}

const BinStore = (state: CardBin[], action: {
    type: string,
    name?: string,
    id?: string
}) => {
  if ( typeof state === 'undefined') {
    if (localStorage.getItem('BinStore')) {
      const parsed = JSON.parse(localStorage.getItem('BinStore') ?? '');
      state = parsed.map((item: any) => new CardBin(item));
    } else {
      state = [
        new CardBin({
          id: '0',
          name: 'Land',
          weight: 0,
        }),
      ];
    }
  }
  switch (action.type) {
    case 'CARDBIN_REMOVED':
      return filterOutCardBin(state, action?.id);
    case 'CARDBIN_ADDED':
      return addCardBin(state, action?.name);
    case 'CARD_WEIGHT_INCREMENT':
      return cardBinIncrement(state, action?.id);
    case 'CARD_WEIGHT_DECREMENT':
      return cardBinDecrement(state, action?.id);
  }
  return state;
};

export default BinStore;
