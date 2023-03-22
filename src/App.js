import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import AddProductPage from './pages/AddProductPage';
import Error from './components/Error'

function App() {
  return (
    <>
    <Navbar/>
    <Sidebar />
    <Routes>
       <Route exact path='/' element={<HomePage/>} />
       <Route exact path='/cart' element={<CartPage/>} />

        <Route path='/add-products' element={<AddProductPage/>} />
        <Route path='error' element={<Error />} />
    </Routes>

    </>
  );
}

export default App;
