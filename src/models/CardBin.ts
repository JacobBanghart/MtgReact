import {Id as uuid} from './Id';
export default class CardBin {
  id: string = uuid();
  name: string = '';
  weight: number = 0;
  cards: string[] = [];

  constructor({
    id = '',
    name,
    weight = 0,
    cards = [],
  }: {
    name: string,
    id?: string,
    weight?: number,
    count?: number,
    cards?: string[]
  }) {
    this.id = !!id ? id : this.id;
    this.name = name;
    this.weight = weight;
    this.cards = cards;
  }
  increment() {
    this.weight = this.weight + 1;
  }
  decrement() {
    this.weight = this.weight - 1;
  }
  addCard(cardId: string) {
    if (!this.cards.includes(cardId)) this.cards.push(cardId);
  }
  removeCard(cardId: string) {
    this.cards = this.cards.filter((item) => item !== cardId);
  }
}
export {
  CardBin,
};
