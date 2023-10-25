import React from 'react';
import './App.css';
import Landing from './landing';
import EmiCalc from './emi-calculator';
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import VideoPlayer from './videoPlayer';
import ProductPage from './shoppingCart/ProductListing';
import ProductDetails from "./shoppingCart/ProductDetails";
import store from "./redux/store";
import { Provider } from "react-redux";
import TaskTable from './task/TaskTable';
import ProductListNew from './shoppingCart/ProductListNew';


function App() {
  

  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/emi-calculator' element={<EmiCalc/>}/>
      <Route path='/video-player' element={<VideoPlayer/>}/>
      <Route path='/shopping' element={<ProductListNew/>}/>
      <Route path="/product/:productId" element={<ProductDetails/>} />
      <Route path='/task-manager' element={<TaskTable/>}/>
      
    </Routes>
    </BrowserRouter>
    </Provider>
   
    
  );

}

export default App;
