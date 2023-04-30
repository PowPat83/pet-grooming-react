import React from 'react';
import LoginPage from './login/LoginPage';
import RegisterPage from './register/RegisterPage';
import NavBar from './components/Navbar';
import Home from './routes/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// bring in all the pages that the app has in app.js
// app.js is our root component, any other components such as navigation,
// pages should be embedded into main app component

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
