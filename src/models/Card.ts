import {Id as uuid} from './Id';
export default class Card {
  id: string = uuid();
  name: string = '';
  count: number = 1;

  constructor(cardObject: any) {
    Object.assign(this, cardObject);
  }
  increment() {
    this.count = this.count + 1;
  }
  decrement() {
    this.count = this.count - 1;
    if (this.count < 0) this.count = 0;
  }
}
export {
  Card,
};
