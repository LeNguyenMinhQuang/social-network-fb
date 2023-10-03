import "./App.css";
import Login from "./components/Auth/Login";
import Home from "./components/Page/Home";
import Messenger from "./components/Page/Messenger";
import User from "./components/Page/User";
import Chatbox from "./components/Page/Chatbox";

import { Route, Routes } from "react-router-dom";
import Newfeed from "./components/Page/Newfeed";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="" element={<Newfeed />} />
          <Route path="message" element={<Messenger />} />
          <Route path="message/:id" element={<Chatbox />} />
          <Route path="user/:id" element={<User />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
