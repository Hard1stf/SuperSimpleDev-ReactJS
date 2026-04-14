import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePages';
import { CheckoutPage } from './pages/CheckoutPage';

import './App.css'

const App = () => {
  return(
    <>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckoutPage/>} />
    </Routes>
    </>
  );
}

export default App
