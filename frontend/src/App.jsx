
import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ProductDetail from './components/product/productDetail';
import ProductSearch from './components/product/productSearch';
import Login from './components/user/Login';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/user/Register';
import store from './Store';
import { useEffect } from 'react';
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectRoute from './components/route/protectRoute';
import UpdateProfile from './components/user/updateProfile';
import UpdatePassword from './components/user/updatePassword';
import Shop from './components/product/shop';
import About from './components/about';
import Cart from './components/cart/cart';
import Shipping from './components/cart/shipping';
import ConfirmOrder from './components/cart/confirmOrder';
import Payment from './components/cart/payment';
import OrderSuccess from './components/cart/orderSuccess';
import UserOrders from './components/order/userOrder';
import OrderDetail from './components/order/orderDetails';
import Dashboard from './admin/dashboard';
import ProductList from './admin/productList';
import NewProduct from './admin/newProduct';
import UpdateProduct from './admin/updateProduct';
import OrderList from './admin/orderList';
import UpdateOrder from './admin/updateOrder';

function App() {

  useEffect(()=>{
    store.dispatch(loadUser)
  },[])
  return (
    <Router>
    <div className="App">
      <HelmetProvider>
      <Header/>
      <ToastContainer theme='dark'/>
      
      <div className="container container-fluid">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/search/:keyword' element={<ProductSearch/>} />
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/myprofile' element={<ProtectRoute><Profile/></ProtectRoute>} />
         <Route path='/myprofile/update' element={<ProtectRoute><UpdateProfile/></ProtectRoute> } />
         <Route path='/myprofile/update/password' element={<ProtectRoute><UpdatePassword/></ProtectRoute> } />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/shipping' element={<ProtectRoute><Shipping/></ProtectRoute> } />
        <Route path='/order/confirm' element={<ProtectRoute><ConfirmOrder/></ProtectRoute> } />
        <Route path='/payment' element={<ProtectRoute><Payment/></ProtectRoute> } />
        <Route path='/order/success' element={<ProtectRoute><OrderSuccess/></ProtectRoute> } />
        <Route path='/orders' element={<ProtectRoute><UserOrders/></ProtectRoute> } />
        <Route path='/order/:id' element={<ProtectRoute><OrderDetail/></ProtectRoute> } />
      </Routes>
      
      </div>

       <Routes>
                  <Route path='/dashboard' element={ <ProtectRoute isAdmin={true}><Dashboard/></ProtectRoute> } />
                  <Route path='/admin/products' element={ <ProtectRoute isAdmin={true}><ProductList/></ProtectRoute> } />
                  <Route path='/admin/products/create' element={ <ProtectRoute isAdmin={true}><NewProduct/></ProtectRoute> } />
                  <Route path='/admin/product/:id' element={ <ProtectRoute isAdmin={true}><UpdateProduct/></ProtectRoute> } />
                  <Route path='/admin/orders' element={ <ProtectRoute isAdmin={true}><OrderList/></ProtectRoute> } />
                   <Route path='/admin/order/:id' element={ <ProtectRoute isAdmin={true}><UpdateOrder/></ProtectRoute> } />
                </Routes>
      <Footer/>
      </HelmetProvider>
    </div>
    </Router>
  );
}

export default App;
