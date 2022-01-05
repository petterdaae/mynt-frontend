import { useState, useCallback } from "react";

function useChanged() {
  const [trigger, setTrigger] = useState(false);
  const triggerTrigger = useCallback(
    () => setTrigger((prev) => !prev),
    [setTrigger]
  );
  return [trigger, triggerTrigger];
}

export default useChanged;
