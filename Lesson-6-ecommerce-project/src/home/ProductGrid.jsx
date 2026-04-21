import axios from 'axios';
import { formatMoney } from '../utils/money';
import { useState } from 'react';
import { Product } from './Product';

export const ProductGrid = ({ products, loadCart }) => {
  return (
    <>
      <div className="products-grid">
        {products.map((product) => {
          return (
            <>
              <Product key={product.id} product={product} loadCart={loadCart}/>
            </>
          );
        })}
      </div>
    </>
  );
};
