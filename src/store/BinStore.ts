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

function cardBinAddCard(
    state: CardBin[], id: string = '', cardId: string = '',
) {
  const itm = state.find((item: CardBin) => item.id == id);
  itm?.addCard(cardId);
  return state;
}
function cardBinRemoveCard(
    state: CardBin[], id: string = '', cardId: string = '',
) {
  const itm = state.find((item: CardBin) => item.id == id);
  itm?.removeCard(cardId);
  return state;
}

function cardBinRemoveCardFromAll(
    state: CardBin[], cardId: string = '',
) {
  const binsThatConatain = state.filter((bin) => bin.cards.includes(cardId));
  binsThatConatain.forEach((bin) => cardBinRemoveCard(state, bin.id, cardId));
  return state;
}

const BinStore = (state: CardBin[], action: {
    type: string,
    name?: string,
    id?: string,
    cardId?: string
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
    case 'CARDBIN_WEIGHT_INCREMENT':
      return cardBinIncrement(state, action?.id);
    case 'CARDBIN_WEIGHT_DECREMENT':
      return cardBinDecrement(state, action?.id);
    case 'CARDBIN_ADD_CARD':
      return cardBinAddCard(state, action?.id, action?.cardId);
    case 'CARDBIN_REMOVE_CARD':
      return cardBinRemoveCard(state, action?.id, action?.cardId);
    case 'REMOVE_CARD_ALL_BINS':
      return cardBinRemoveCardFromAll(state, action?.cardId);
  }
  return state;
};

export default BinStore;
