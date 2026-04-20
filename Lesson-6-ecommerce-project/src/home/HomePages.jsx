import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import { ProductGrid } from './ProductGrid';
import './HomePage.css';

export const HomePage = ({ cart }) => {
  // fetch('http://localhost:3000/api/products')
  //   .then(res => res.json()).then(data => console.log(data))

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    };
    getHomeData();
  }, []);

  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="../../../public/home-favicon.png"
      />
      <title>E-commerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid products={products}/>
      </div>
    </>
  );
};
