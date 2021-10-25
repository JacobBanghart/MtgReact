export default function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export {
  getRandomInt,
};
