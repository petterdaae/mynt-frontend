import IElement from "../components/CrudList/IElement";
import { Name } from "../types";
import { useCrud } from "./index";

function useNames() {
  const { elements, loading, addElement, updateElement, deleteElement } =
    useCrud<IElement<Name>>(`${process.env.REACT_APP_BACKEND_URL}/names`);

  return {
    elements: elements,
    loading: loading,
    createElement: addElement,
    deleteElement: deleteElement,
    updateElement: updateElement,
  };
}

export default useNames;
