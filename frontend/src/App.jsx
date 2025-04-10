import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loginpage from './components/Loginpage';
import Reg from './components/Reg';
import Todo from './components/Home/Todo';
function App() {
  return (
    <BrowserRouter>
      <div>
      <Routes>
        <Route path="/" element={<Loginpage />} /> 
        <Route path="/Reg" element={<Reg />} /> 
        <Route path="/Todo" element={<Todo />} /> 
      </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
