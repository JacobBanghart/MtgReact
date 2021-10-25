import {Id as uuid} from './Id';
export default class Card {
  id: string = uuid();
  name: string = '';
  count: number = 1;

  constructor({
    id = '',
    name,
    count = 1,
  }: {
        id?: string,
        name: string,
        count?: number
    }) {
    this.id = !!id ? id : this.id;
    this.name = name;
    this.count = count;
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
