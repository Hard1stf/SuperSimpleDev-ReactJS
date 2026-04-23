import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export const CartItemDetails = ({ cartItem, loadCart }) => {
  const [isUpdateQuantity, setIsUpdateQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantityState = () => {
    setIsUpdateQuantity(q => !q);
  }
  
  const updateInput = event => {
    setQuantity(event.target.value);
  }


  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span> Quantity:{' '}
          {isUpdateQuantity ? 
            <input type="text" className="update-quantity" value={quantity} onChange={updateInput}/> : 
            <span className="quantity-label">{cartItem.quantity}</span>
          }
          </span>
          <span className="update-quantity-link link-primary" onClick={updateQuantityState}>Update</span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>Delete</span>
        </div>
      </div>
    </>
  );
};