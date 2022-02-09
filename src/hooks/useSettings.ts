import { useState, useCallback, useEffect } from "react";

function useSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/settings`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, [setLoading, setSettings]);

  const update = useCallback(
    (newSettings) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/settings`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(newSettings),
      });
      setSettings(newSettings);
    },
    [setSettings]
  );

  return {
    settings,
    loading,
    update,
  };
}

export default useSettings;
