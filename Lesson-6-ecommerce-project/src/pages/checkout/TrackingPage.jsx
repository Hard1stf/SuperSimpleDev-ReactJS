import { Link } from 'react-router';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../../Components/Header';
import './TrackingPage.css';
import dayjs from 'dayjs';

export const TrackingPage = ({cart}) => {
  const [order, setOrder] = useState(null);
  const {orderId, productId} = useParams();
  useEffect(() => {
    const getOrderDetailData = async () => {
      const res = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(res.data);
    } 
    getOrderDetailData();
  }, [orderId])

  if (!order) return null;

  const orderProducts = order.products.find((orderProduct) => orderProduct.productId === productId);
  const totalDeliveryTimeMs = orderProducts.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

  if (deliveryPercent > 100) deliveryPercent = 100;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="../../../public/tracking-favicon.png" />
      <title>Tracking</title>

      <Header cart={cart} /> 

      <div class="tracking-page">
        <div class="order-tracking">
          <Link class="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div class="delivery-date">{deliveryPercent >= 100 ? 'Delivered' : 'Arriving'} on {dayjs(orderProducts.estimatedDeliveryTimeMs).format('dddd MMMM D')}</div>

          <div class="product-info">
            {orderProducts.product.name}
          </div>

          <div class="product-info">Quantity: {orderProducts.quantity}</div>

          <img
            class="product-image"
            src={orderProducts.product.image}
          />

          <div class="progress-labels-container">
            <div class="progress-label">Preparing</div>
            <div class="progress-label current-status">Shipped</div>
            <div class="progress-label">Delivered</div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
};
