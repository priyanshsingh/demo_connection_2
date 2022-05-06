// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";

import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';

function App() {
  return (
    <>
      <div className="App">
        <Home />
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
