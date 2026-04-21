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

  // these variable are storing boolean value.
  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="../../../public/tracking-favicon.png" />
      <title>Tracking</title>

      <Header cart={cart} /> 

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">{deliveryPercent >= 100 ? 'Delivered' : 'Arriving'} on {dayjs(orderProducts.estimatedDeliveryTimeMs).format('dddd MMMM D')}</div>

          <div className="product-info">
            {orderProducts.product.name}
          </div>

          <div className="product-info">Quantity: {orderProducts.quantity}</div>

          <img
            className="product-image"
            src={orderProducts.product.image}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing ? "current-status" : ""}`}>Preparing</div>
            <div className={`progress-label ${isShipped ? "current-status" : ""}`}>Shipped</div>
            <div className={`progress-label ${isDelivered ? "current-status" : ""}`}>Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
};
