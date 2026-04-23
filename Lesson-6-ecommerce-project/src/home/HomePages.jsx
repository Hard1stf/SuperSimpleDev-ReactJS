import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../Components/Header';
import { ProductGrid } from './ProductGrid';
import './HomePage.css';

export const HomePage = ({ cart, loadCart }) => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search ? `/api/products?search=${search}` : `/api/products`;
      const res = await axios.get(urlPath);
      setProducts(res.data);
    };
    getHomeData();
  }, [search]);

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
        <ProductGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
};
