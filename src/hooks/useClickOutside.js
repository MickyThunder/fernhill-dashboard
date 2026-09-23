import { useEffect, useRef } from 'react';

export function useClickOutside(ref, onOutside, active = true) {
  const handlerRef = useRef(onOutside);
  handlerRef.current = onOutside;

  useEffect(() => {
    if (!active) return undefined;

    function handlePointer(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handlerRef.current(event);
      }
    }

    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('touchstart', handlePointer);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('touchstart', handlePointer);
    };
  }, [ref, active]);
}
