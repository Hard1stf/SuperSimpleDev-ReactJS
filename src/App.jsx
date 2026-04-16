import { Routes, Route } from 'react-router';
import { HomePage } from './pages/checkout/HomePages';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/checkout/OrdersPage';
import { TrackingPage } from './pages/checkout/TrackingPage';

import './App.css'

const App = () => {
  return(
    <>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckoutPage/>} />
      <Route path='orders' element={<OrdersPage />}/>
      <Route path='tracking' element={<TrackingPage />}/>
    </Routes>
    </>
  );
}

export default App
