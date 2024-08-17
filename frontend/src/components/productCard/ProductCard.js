import React, { Component } from "react";
import AddToCartIcon from "../../icons/AddToCartIcon";
import { CartContext } from "../../context/CartContext";
import classes from "./Product.module.scss";
import { initializeAttributes } from "../../helpers/initializeAttribute";

class ProductCard extends Component {
  static contextType = CartContext;

  navigateToProduct = () => {
    const { product, navigate } = this.props;
    const category = encodeURIComponent(
      product.category.toLowerCase().replace(/ /g, "-")
    );

    navigate(`/product/${product.id}`);
  };

  onClickAddProduct = (e) => {
    const { product } = this.props;
    const { addToCart, toggleCart } = this.context;

    const initialAttributes = initializeAttributes(product.attributes);

    const cartItem = {
      ...product,
      selectedAttributes: initialAttributes,
      quantity: 1,
    };
    e.stopPropagation();
    addToCart(cartItem);
    toggleCart();
  };

  render() {
    const { product } = this.props;

    return (
      <div
        className={`${classes.product} ${
          !product.inStock ? classes["out-of-stock"] : ""
        }`}
        onClick={this.navigateToProduct}
        data-testid={`product-${product.name.toLowerCase().replace(/ /g, "-")}`}
      >
        <div className={classes["image-container"]}>
          <img
            src={product.gallery[0].url}
            alt={product.name}
            className={classes.image}
          />
          {!product.inStock && <span>Out of stock</span>}
        </div>
        <div className={classes["product-info"]}>
          <div
            className={classes["add-to-cart-icon"]}
            onClick={this.onClickAddProduct}
          >
            <AddToCartIcon />
          </div>
          <div>
            <h4>{product.name}</h4>
            <p className={classes.price}>{`$${product.prices[0].amount.toFixed(
              2
            )}`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
