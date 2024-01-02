import { createContext, useContext, useEffect, useRef, useState } from "react";
import { unstable_HistoryRouter, useNavigation } from "react-router-dom";

const AppContext = createContext();

export const AppContextWrapper = ({ children }) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  let sharedState = {
    token,
    setToken,
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
