import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import FetchApi from '../common/fetchApi';

const ProductPage = () => {
  const products = useSelector((state) => state.allProducts?.products);
  console.log("products==>", products)
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchApi = async () => {
      let response = await fetch("https://fakestoreapi.com/products");
      let result = await response.json();
      dispatch(setProducts(result))
    }
    fetchApi();
  }, []);

  console.log("Products :", products);
  return (
    <div className="flex-container">
      <ProductComponent />
    </div>
  );
};

export default ProductPage;
