import React, { useState, useEffect } from "react";
import whatsappImage from "../../assests/whatsapp.png";
import "./vendor.css";
import categoryService from "../../services/categoryService";
import productService from "../../services/productService";

function Vendor() {
  const [categories, setCategories] = useState([]);
  const [categoriesError, setcategoriesError] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    {
      categoryService
        .getCategories()
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          document.body.classList.remove("loading-indicator");
        });

      productService
        .getProducts()
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          document.body.classList.remove("loading-indicator");
        });
    }
  }, []);

  const onCategoryButtonClick = (selectedCategory) =>{
    console.log(selectedCategory);
  }

  return (
    <div>
      <div className="header-area">
        <div className="header">
          <h2 className="header-title">RAJRATNA GLOBAL</h2>
          <div className="mobile">
            <p className="header-text">Mobile: 7801924094</p>
            <a
              target="_blank"
              href="https://api.whatsapp.com/send?phone=+917801924094"
            >
              <img className="wp-image" src={whatsappImage}></img>
            </a>
          </div>
          <p className="header-text">GSTIN: 24GBEPS3337F1ZN</p>
          <p className="header-text">
            Address: Nr Tower, Main Bazaar Sathamba 383340, Gujarat
          </p>
        </div>
      </div>
      <div className="search-container">
        <input
          className="form-control"
          type="text"
          placeholder="Search items"
          aria-label="Search"
        />
      </div>
      <div className="caro">
        <div className="cat-container">
          <button type="button" className="btn-cat" key="0" onClick={onCategoryButtonClick(0)}>
            All items
          </button>
          {categories.map((category) => (
            <button type="button" className="btn-cat" key={category.id} onClick={onCategoryButtonClick(category.id)}>
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="selected-cat-text">
        <strong>All items</strong>
      </div>
      <div className="product-container">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img
              className="product-image"
              src={product.productImageUrl}
            />

            <div className="product-text-container">
              <p>{product.name}</p>
              <button type="button" className="btn btn-outline-primary">
                ASK WHOLESALE PRICE
              </button>
            </div>
            <div className="product-price-container">
              <p>{"₹ "+product.price+" / "+product.productUnit}</p>
              <button type="button" className="btn btn-outline-primary">
                ADD
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vendor;
