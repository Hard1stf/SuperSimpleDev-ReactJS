import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../Components/Header';
import './OrdersPage.css';
import { OrdersGrid } from './OrdersGrid';

export const OrdersPage = ({ cart, loadCart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrderData = async () => {
      const res = await axios.get('/api/orders?expand=products');
      setOrders(res.data)
    }
    getOrderData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="../../../public/orders-favicon.png" />
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart}/>
      </div>
    </>
  );
};
