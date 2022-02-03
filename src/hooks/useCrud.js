import { useState, useEffect, useCallback } from "react";

function useCrud(endpoint) {
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(endpoint, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((elements) => {
        setElements(elements);
        setLoading(false);
      });
  }, [setElements]);

  const addElement = useCallback(
    (newElement) => {
      setLoading(true);
      fetch(endpoint, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newElement),
      });
      setElements((prev) => [
        ...prev,
        { ...newElement, id: Math.max(prev.map((e) => e.id) + 1) },
      ]);
    },
    [setElements]
  );

  const updateElement = useCallback(
    (element) => {
      fetch(endpoint, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(element),
      });
      setElements((prev) =>
        prev.map((e) => (e.id === element.id ? element : e))
      );
    },
    [setElements]
  );

  const deleteElement = useCallback(
    (id) => {
      fetch(endpoint, {
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
      });
      setElements((prev) => prev.filter((e) => e.id !== id));
    },
    [setElements]
  );

  return {
    elements,
    loading,
    addElement,
    deleteElement,
    updateElement,
  };
}

export default useCrud;
