import {Id as uuid} from './Id';
export default class CardBin {
  id: string = uuid();
  name: string = '';
  weight: number = 0;

  constructor({
    id = '',
    name,
    weight = 0,
  }: {
    name: string,
    id?: string,
    weight?: number,
    count?: number
  }) {
    this.id = !!id ? id : this.id;
    this.name = name;
    this.weight = weight;
  }
  increment() {
    this.weight = this.weight + 1;
  }
  decrement() {
    this.weight = this.weight - 1;
  }
}
export {
  CardBin,
};
