import { Route, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime"
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Notfound from "./pages/Notfound";
import Header from "./components/header";

function App(){
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Fragment>
); 

}

export default App
