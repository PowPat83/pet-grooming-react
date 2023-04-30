import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// import Home from './routes/Home';
// import LoginPage from './login/LoginPage';
// import RegisterPage from './register/RegisterPage';
// import Navbar from './components/Navbar';
import './App.css';
import store from './store';

const stripePromise = loadStripe(
  'pk_test_51MwRjXKNLL3pkBrvE2TpHXXkpvct5YJYK9MtxlcbQey5Mz91nRePFrQgDUFx99TeiRC2T4o9ePoZS0nRlNkMAo2p00FIuAE8mp'
);

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
    {/* allow our application to use stripe within our components */}
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </Provider>
);
