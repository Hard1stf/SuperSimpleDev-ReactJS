import dayjs from 'dayjs';
import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemDetails';

export const OrderSummary = ({ cart, deliveryOptions }) => {
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
                  <div className="delivery-date">
                    Delivery date:{' '}
                    {dayjs(
                      selectedDeliveryOption.estimatedDeliveryTimeMs,
                    ).format('dddd, MMMM, D')}
                  </div>

                  <div className="cart-item-details-grid">
                    <CartItemDetails cartItem={cartItem} />

                    <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions}
                    />
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};
