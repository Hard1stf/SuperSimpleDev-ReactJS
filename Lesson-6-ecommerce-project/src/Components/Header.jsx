import { NavLink } from 'react-router';
import './Header.css';
import Logo from '../assets/images/logo-white.png';
import MobileLogo from '../assets/images/mobile-logo.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import CartIcon from '../assets/images/icons/cart-icon.png';
import { useState } from 'react';

export const Header = ({ cart }) => {
  const [searchInput, setSearchInput] = useState('');

  let totalQuantity = 0;
  cart.forEach(cartItem => totalQuantity += cartItem.quantity);

  const getSearchValue = event => {
    setSearchInput(event.target.value);
  }

  const searchBarInput = event => {
    console.log(searchInput);
  }

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src={Logo} />
            <img className="mobile-logo" src={MobileLogo} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" onChange={getSearchValue} />

          <button className="search-button" onClick={searchBarInput}>
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
};
