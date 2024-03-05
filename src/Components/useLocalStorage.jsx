import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  const updateStorage = (newValue) => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  useEffect(() => {
    updateStorage(value);
  }, [key, value]);

  return [value, setValue, updateStorage];
};
