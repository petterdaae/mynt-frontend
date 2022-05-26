import { useConstraintSystem } from "./useConstraintSystem";
import hd from "hotdrink";
import { useEffect } from "react";

function useComponent(component: hd.Component) {
  const cs = useConstraintSystem();

  useEffect(() => {
    cs?.addComponent(component);
    cs?.update();
  }, [cs, component]);
}

export default useComponent;
