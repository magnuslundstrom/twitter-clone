import { useEffect, useRef } from 'react';

const usePrevious = (value, init) => {
  const ref = useRef(init);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
