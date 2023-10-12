import React from 'react';
import {Outlet,Link}from 'react-router-dom'
import data from '../src/json/menuData.json';

function Landing() {
  return (
    <>
    <div className='menuContainer'>
    {data.menu.map((item, index) => (
      <Link to={item.redirectUrl} key={index}>
        <div className='menuCard'>
          <div className='menuImg'>
            <img src={item.imgPath} alt={item.title} />
          </div>
          <p>{item.title}</p>
        </div>
        </Link>
      ))}
      <Outlet/>
    </div>
   
    </>
  );
}

export default Landing;
