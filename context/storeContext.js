const { useState, createContext } = require("react");

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [latLong, setLatLong] = useState("");
  const [coffeeStores, setCoffeeStores] = useState([]);

  const value = {
    latLong,
    setLatLong,
    coffeeStores,
    setCoffeeStores,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
