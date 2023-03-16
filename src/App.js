import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import SingleProductPage from './pages/SingleProductPage';
import AddProductPage from './pages/AddProductPage';

function App() {
  return (
    <>
    <Navbar/>
    <Sidebar />
    <Routes>
       <Route exact path='/' element={<HomePage/>} />
       <Route exact path='/cart' element={<CartPage/>} />
        <Route path='/:id' element={<SingleProductPage/>} />
        <Route path='/add-products' element={<AddProductPage/>} />
    </Routes>

    </>
  );
}

export default App;
