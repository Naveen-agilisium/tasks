import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductComponent = () => {
  const products = useSelector((state) => state?.productsReducer?.products);
  console.log(products)
  const renderList = products?.map((product) => {
    
    const { id, title, image, price, category } = product;
    return (
      <div className="flex-items" key={id}>
        <Link to={`/product/${id}`}>
          <div className="">
            <div className="card">
              <div className="image">
                <img src={image} alt={title} />
              </div>
              <div className="content">
                <div className="header">{title}</div>
                <div className="meta price">$ {price}</div>
                <div className="meta">{category}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return <>{renderList}</>;
};

export default ProductComponent;
