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

  const updateQuantityState = async () => {
    setIsUpdateQuantity(q => !q); 

    await axios.put(`/api/cart-items/${cartItem.productId}`,{ 
      quantity: Number(quantity),
    });

    await loadCart();
  }
  
  const updateInput = event => {
    setQuantity(event.target.value);
  }

  const keyboardUpdate = event => {
    if (event.key === 'Enter'){
      updateQuantityState();
      console.log('Enter');
    }else if(event.key === 'Escape'){
      setQuantity(cartItem.quantity)
      setIsUpdateQuantity(false);
      console.log('Escape');
    }
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
            <input type="text" className="update-quantity" value={quantity} onChange={updateInput} onKeyDown={keyboardUpdate}/> : 
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