import { useEffect, useRef } from "react";

function useEffectSkipFirst(effect, deps) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    effect();
  }, deps);
}

export default useEffectSkipFirst;
