import React, { useEffect } from 'react';
import {AiOutlineShoppingCart} from 'react-icons/ai'
import FetchApi from '../common/fetchApi';
import ProductPage from './ProductListing';

function Dashboard() {

   
  return (
    <>
    {/* <div className='shoppingCardContainer'>
        <div className='header'>
        <h3>#Products</h3>
        <span><AiOutlineShoppingCart/></span>
        </div>
        <div className='productList'>
        {data &&
        data.map((item) => {
          return (
            <>
            <div className='itemCard'>
                <div className='productImg'>
                    <img src={item.image}/>
                </div>
            </div>
            </>
          );
        })}
        </div>
    

    </div> */}
    <ProductPage/>
    </>
  )
}

export default Dashboard