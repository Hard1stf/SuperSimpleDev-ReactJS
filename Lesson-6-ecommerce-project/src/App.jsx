import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import axios from 'axios';
import { HomePage } from './pages/checkout/HomePages';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/checkout/OrdersPage';
import { TrackingPage } from './pages/checkout/TrackingPage';
import { NotFoundPage } from './pages/NotFoundPage';

import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
    .then(res => {
      setCart(res.data);
    })
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
