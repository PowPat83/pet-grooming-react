import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Home from './routes/Home';
// import LoginPage from './login/LoginPage';
// import RegisterPage from './register/RegisterPage';
// import Navbar from './components/Navbar';
import './App.css';
import store from './store';

window.LOGIN_SERVICE = 'http://localhost:8080';

// const AppLayout = () => {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// };

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path: '/',
//         element: <Home />,
//       },
//       {
//         path: 'register',
//         element: <RegisterPage />,
//       },
//       {
//         path: 'login',
//         element: <LoginPage />,
//       },
//     ],
//   },
// ]);
// createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router} />
// );
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
