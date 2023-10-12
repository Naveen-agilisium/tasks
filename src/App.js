import React from 'react';
import './App.css';
import Landing from './landing';
import EmiCalc from './emi-calculator';
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import VideoPlayer from './videoPlayer';


function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/emi-calculator' element={<EmiCalc/>}/>
      <Route path='/video-player' element={<VideoPlayer/>}/>
      
    </Routes>
    </BrowserRouter>
   
    
  );

}

export default App;
