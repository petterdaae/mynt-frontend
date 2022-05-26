import hd from "hotdrink";
import { createContext, ReactNode, useContext, useMemo } from "react";

const ConstraintSystemContext = createContext<hd.ConstraintSystem | null>(null);

interface Props {
  children?: ReactNode;
}

function ConstraintSystemProvider({ children }: Props) {
  const cs = useMemo(() => new hd.ConstraintSystem(), []);
  return (
    <ConstraintSystemContext.Provider value={cs}>
      {children}
    </ConstraintSystemContext.Provider>
  );
}

function useConstraintSystem() {
  return useContext(ConstraintSystemContext);
}

export { ConstraintSystemProvider, useConstraintSystem };
