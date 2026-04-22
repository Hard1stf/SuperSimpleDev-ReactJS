import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { CheckoutHeader } from './CheckoutHeader';
import { formatMoney } from '../../utils/money';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';

export const CheckoutPage = ({ cart, loadCart }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getCheckoutData = async () => {
      const res = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(res.data)
    }
    getCheckoutData();
  }, []);

  useEffect(() => {
    const updatePaymentSummaryDetails = async () => {
      const res = await axios.get('/api/payment-summary');
      setPaymentSummary(res.data)
    }
    updatePaymentSummaryDetails();
  }, [cart])

  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="../../../public/cart-favicon.png"
      />
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>

          <PaymentSummary paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
};
