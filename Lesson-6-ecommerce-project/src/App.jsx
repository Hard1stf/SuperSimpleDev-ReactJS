import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import axios from 'axios';
import { HomePage } from './home/HomePages';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/checkout/TrackingPage';
import { NotFoundPage } from './pages/NotFoundPage';

import './App.css';

window.axios = axios;

const App = () => {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const res = await axios.get('/api/cart-items?expand=product');
      setCart(res.data);
  }
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart}/>} />
        <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
        <Route path="*" element={<NotFoundPage cart={cart}/>} />
      </Routes>
    </>
  );
};

export default App;
