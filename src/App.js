import React from 'react';
import LoginPage from './login/LoginPage';
import RegisterPage from './register/RegisterPage';
import SingleServicePage from './catalog/SingleServicePage';
import BookingPage from './booking/BookingPage';
import NavBar from './components/Navbar';
import Home from './routes/Home';
import CatalogPage from './catalog/CatalogPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Error from './components/ErrorPage';
// because we created index.js hence can just direct to folder instead of the respective page
// import { Error } from './components';
// bring in all the pages that the app has in app.js
// app.js is our root component, any other components such as navigation,
// pages should be embedded into main app component

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<CatalogPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/service/:serviceId' element={<SingleServicePage />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
