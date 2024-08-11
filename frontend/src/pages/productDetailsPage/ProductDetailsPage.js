import React, { Component } from 'react';
import ProductGallery from '../../components/productGallery/ProductGallery';
import ProductAttributes from '../../components/productAttribute/ProductAttribute';
import AddToCartButton from '../../components/addToCartButton/AddToCartButton';
import { ProductsContext, withProducts } from '../../context/ProductsContext';
import withRouter from '../../hocs/withRouter';
import Loader from '../../components/loader/Loader';
import classes from './ProductDetailsPage.module.scss';
import parse from 'html-react-parser';
import { toCamelCase } from '../../helpers/initializeAttribute';

class ProductDetailPage extends Component {
  static contextType = ProductsContext;
  componentDidMount() {
    const { productId } = this.props.params;
    this.context.fetchProductById(productId);
  }

  render() {
    const { product, selectedAttributes, loading } = this.context;

    if (loading) return <Loader />;

    if (!product)
      return (
        <div>
          <p>There is no product</p>
        </div>
      );
    else
      return (
        <div className={classes['product-details']}>
          <ProductGallery images={product.gallery} />

          <div className={classes['product-summary']}>
            <h4>{product.name}</h4>
            {product.attributes?.map((attr) => (
              <ProductAttributes
                key={attr.id}
                attribute={attr}
                selectedAttribute={selectedAttributes[toCamelCase(attr.name)]}
                handleAttributeSelect={this.context.handleAttributeSelect}
                size='big'
              />
            ))}
            <div className={classes.price}>
              <h3>Price</h3>
              {product?.prices?.map((price, index) => (
                <span
                  key={product.id + index}
                  className={classes.value}
                >{`${price.amount} ${price.currency.symbol}`}</span>
              ))}
            </div>
            <AddToCartButton
              product={product}
              selectedAttributes={selectedAttributes}
            />
            <div
              data-testid='product-description'
              className={classes['product-description']}
            >
              {product.description && parse(product.description)}
            </div>
          </div>
        </div>
      );
  }
}

export default withRouter(withProducts(ProductDetailPage));
