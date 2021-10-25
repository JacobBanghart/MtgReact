import React from 'react';
export default function useForceUpdate() {
  // eslint-disable-next-line
  const [_, setValue] = React.useState(0); // integer state
  // update the state to force render
  return () => setValue((value: number) => value + 1);
}
export {
  useForceUpdate,
};
