import { Routes, Route } from 'react-router-dom';
import "./App.css";
import HomePage from "./Pages/homePage";
import ChatPage from './Pages/chatPage';

function App() {
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
