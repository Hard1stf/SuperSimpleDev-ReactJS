import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { CheckoutHeader } from './CheckoutHeader';
import { formatMoney } from '../../utils/money';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';

export const CheckoutPage = ({ cart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios
      .get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((res) => setDeliveryOptions(res.data));

    axios
      .get('/api/payment-summary')
      .then((res) => setPaymentSummary(res.data));
  }, []);

  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="../../../public/cart-favicon.png"
      />
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions}/>

          <PaymentSummary paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
};
