import hd from "hotdrink";
import { useEffect, useState } from "react";

function useVariable<T>(variable: hd.Variable<T>) {
  const [value, setValue] = useState<T>(variable.value as T);

  useEffect(() => {
    variable.subscribe({
      next: (updated: any) => {
        setValue(updated.value);
      },
    });
  }, [variable]);

  return value;
}

export default useVariable;
