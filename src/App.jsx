import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePages';

import './App.css'

const App = () => {
  return(
    <>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<div>Checkout</div>} />
    </Routes>
    </>
  );
}

export default App
