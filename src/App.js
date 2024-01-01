import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/homePage";
import ChatPage from "./Pages/chatPage";
import { useAppContext } from "./Context/AppContext";
import { useEffect } from "react";

function App() {
  const { setToken, setUser } = useAppContext();

  const navigation = useNavigate();

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("token"));
    const _user = JSON.parse(localStorage.getItem("user"));

    setToken(userToken);
    setUser(_user);
    if (!userToken || !_user) {
      navigation("/");
    }
  }, [navigation]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
