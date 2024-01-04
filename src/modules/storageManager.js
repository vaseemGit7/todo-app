const storageManager = (() => {
  const saveToLocalStorage = (data) => {
    localStorage.setItem("projectStructure", JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const loadedData = localStorage.getItem("projectStructure");
    return loadedData ? JSON.parse(loadedData) : null;
  };

  return {
    saveToLocalStorage,
    loadFromLocalStorage,
  };
})();

export default storageManager;
