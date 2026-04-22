import dayjs from 'dayjs';
import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';

export const OrderSummary = ({ cart, deliveryOptions, loadCart }) => {
  return (
    <>
      <div className="order-summary">
        {deliveryOptions.length &&
          cart.map((cartItem) => {
            const selectedDeliveryOption = deliveryOptions.find(
              (deliveryOption) =>
                deliveryOption.id === cartItem.deliveryOptionId,
            );
            return (
              <>
                <div key={cartItem.productId} className="cart-item-container">
                  <DeliveryDate selectedDeliveryOption={selectedDeliveryOption}/>

                  <div className="cart-item-details-grid">
                    <CartItemDetails cartItem={cartItem} loadCart={loadCart} />

                    <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};
