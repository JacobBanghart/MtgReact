import {Card} from '../models';
export default function DrawHand(deck: Card[]): Card[] {
  return deck.slice(0, 7);
};
export {
  DrawHand,
};
