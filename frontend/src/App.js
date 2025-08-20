
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
        <Route path='/register' element={<Register/>} />
      </Routes>
      </div>
      <Footer/>
      </HelmetProvider>
    </div>
    </Router>
  );
}

export default App;
