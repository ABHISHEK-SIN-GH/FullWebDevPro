import './App.css';
import Checkout from './Components/Checkout';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import ProductView from './Components/ProductView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Redux/Store';

function App() {
  return (
    <Router>
        <Provider store={Store}>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/productId/:id' element={<ProductView/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
          </Routes>  
        </Provider>
    </Router>
  );
}

export default App;
