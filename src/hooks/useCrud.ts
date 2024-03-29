import { useState, useEffect, useCallback } from "react";

interface E {
  id: number;
}

function useCrud<T extends E>(endpoint: string) {
  const [elements, setElements] = useState<T[]>([]);
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
  }, [setElements, endpoint]);

  const addElement = useCallback(
    (newElement: T) => {
      const temporaryId = Math.max(...elements.map((e) => e.id)) + 10;
      setElements((prev) => [...prev, { ...newElement, id: temporaryId }]);
      fetch(endpoint, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newElement),
      })
        .then((res) => res.json())
        .then((res) => {
          setElements((prev) =>
            prev.map((e) => (e.id === temporaryId ? { ...e, id: res.id } : e))
          );
        });
    },
    [setElements, endpoint, elements]
  );

  const updateElement = useCallback(
    (element: T) => {
      fetch(endpoint, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(element),
      });
      setElements((prev) =>
        prev.map((e) => (e.id === element.id ? element : e))
      );
    },
    [setElements, endpoint]
  );

  const deleteElement = useCallback(
    (id: number) => {
      fetch(endpoint, {
        credentials: "include",
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
      });
      setElements((prev) => prev.filter((e) => e.id !== id));
    },
    [setElements, endpoint]
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
