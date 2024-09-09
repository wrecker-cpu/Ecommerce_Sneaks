import { lazy, Suspense, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header'
import product from './product'
import { useDispatch, useSelector } from 'react-redux'
import { productMethod } from './store/ProductSlice/ProductSlice'
import Footer from './components/Footer'
import ScrollTop from './util/ScrollTop';
import ProtectRoute from './util/ProtectRoute';
import ErrorBoundary from './components/ErrorBoundary';

function App() {

const Home = lazy(() => import('./components/Home'));
const Shoes = lazy(() => import('./components/Shoes'));
const ShoesDetails = lazy(() => import('./components/ShoesDetails'));
const Checkout = lazy(() => import('./components/Checkout'));
const Payment = lazy(() => import('./components/Payment'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const UserProfile = lazy(() => import('./components/UserProfile'));


  const order=useSelector((state)=>state.order)
  
  const dispatch=useDispatch();
  useEffect(() => {
   
    dispatch(productMethod.getProducts(product))
    
  }, [dispatch])


  useEffect(() => {
    const sendOrder = async () => {
      try {
        const response = await fetch(
          'https://codage-69f6a-default-rtdb.asia-southeast1.firebasedatabase.app/order.json',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order }),
          }
        );
  
        if (!response.ok) {
          throw new Error('Failed to send order data');
        }
  
        console.log('Order data sent successfully!');
      } catch (error) {
        console.error('Error sending order:', error);
      }
    };
  
    if (order) {
      sendOrder();
    }
  }, [order]);
  


  return (
    <Router>
    <Header/>
    <main className='content'>
    <ScrollTop />
    <ErrorBoundary>
    <Suspense fallback={<p>Is loading</p>}>
    <Routes>
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/userprofile' element={
      <ProtectRoute>
         <UserProfile/>
        </ProtectRoute>
      }/>
     <Route path="/" element={<Home />} />
     <Route path="/shoes" element={<Shoes />} />
     <Route path="/shoes/:gender" element={<Shoes />} />
     <Route path="/shoes/shoesdetails/:id" element={<ShoesDetails />} />
     <Route path="/shoes/checkout" element={<Checkout/>} />
     <Route path="/shoes/checkout/payment" element={<ProtectRoute>
         <Payment/>
        </ProtectRoute>} />
     </Routes>
     </Suspense>
     </ErrorBoundary>
     </main>
     <Footer/>
    </Router>
  )
}

export default App
