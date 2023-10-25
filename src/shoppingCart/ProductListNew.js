import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { setProducts } from "../redux/actions/productsActions";

function ProductListNew() {
    const [cart, setCart] = useState(
        localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : []
    );
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    console.log('cart', cart.length)
    const products = useSelector((state) => state?.productsReducer?.products);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApi = async () => {
            let response = await fetch("https://fakestoreapi.com/products");
            let result = await response.json();
            dispatch(setProducts(result))
        }
        fetchApi();
    }, []);
console.log("product",products.length);
    const renderList = products?.length > 1 ? products?.map((product, index) => {
        const { id, title, image, price, category } = product;
        return (
            <div className='productCard' key={index}>
                <Link to={`/product/${id}`}>
                    <div className='productImg'>
                        <img src={image} alt={title} />
                        <span className='meta'>{category}</span>
                    </div>
                    <div className='productDetails'>
                        <span className='amtCard'>$ {price}</span>
                        <p className='prd-title'>{title}</p>
                    </div>
                </Link>

            </div>
        )

    }): <div className="flex justify-center items-center w-full">...Loading</div>

    return (
        <>
            <div className='flex justify-end p-8 text-2xl cursor-pointer'>
                <div className='relative'>
                    <AiOutlineShoppingCart />
                    {cart.length > 0 ? <span className='badgeIcon'>10</span> : null}

                </div>

            </div>
            <div className='productList'>
                {renderList}
            </div>
        </>

    )
}

export default ProductListNew