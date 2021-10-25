import {Card} from '../models';
export default function Shuffle(cards: Card[]): Card[] {
  const shuffledCards = [...cards];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = shuffledCards[i];
    shuffledCards[i] = shuffledCards[j];
    shuffledCards[j] = temp;
  }
  return shuffledCards;
}
export {
  Shuffle,
};
