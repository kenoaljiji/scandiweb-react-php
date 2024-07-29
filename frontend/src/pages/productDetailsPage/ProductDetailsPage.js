import React, { Component } from 'react';
import ProductGallery from '../../components/productGallery/ProductGallery';
import ProductAttributes from '../../components/productAttribute/ProductAttribute';
import AddToCartButton from '../../components/addToCartButton/AddToCartButton';
import { withProducts } from '../../context/graphQlContext';
import withRouter from '../../hocs/withRouter';
import Loader from '../../components/loader/Loader';
import classes from './ProductDetailsPage.module.scss';

class ProductDetailPage extends Component {
  state = {
    product: null,
    selectedAttributes: {},
    loading: true,
  };

  componentDidMount() {
    this.loadProductDetails();
  }

  loadProductDetails = () => {
    const { productId } = this.props.params;
    this.props
      .fetchProductById(productId)
      .then((response) => {
        const product = response.data.product;
        if (product) {
          // Initialize selected attributes by selecting the first item of each attribute
          const initialAttributes = product.attributes.reduce(
            (acc, attribute) => {
              if (attribute.items && attribute.items.length > 0) {
                acc[attribute.name] = attribute.items[0].id; // Select the first item by default
              }
              return acc;
            },
            {}
          );

          this.setState({
            product: product,
            selectedAttributes: initialAttributes,
            loading: false,
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        console.error('Error loading product details:', error);
        this.setState({ loading: false });
      });
  };

  handleAttributeSelect = (attributeName, optionId) => {
    this.setState((prevState) => ({
      selectedAttributes: {
        ...prevState.selectedAttributes,
        [attributeName]: optionId,
      },
    }));
  };

  render() {
    const { product, selectedAttributes, loading } = this.state;

    /*   console.log(selectedAttributes, product); */

    if (loading) return <Loader />;

    if (!product)
      return (
        <div>
          <p>There is no product</p>
        </div>
      );

    return (
      <div className={classes['product-details']}>
        <ProductGallery images={product.gallery} />

        <div className={classes['product-summary']}>
          <h4>{product.name}</h4>
          <ProductAttributes
            attributes={product.attributes}
            selectedAttributes={selectedAttributes}
            onSelect={this.handleAttributeSelect}
          />
          <div className={classes.price}>
            <h3>Price</h3>
            {product.prices.map((price) => (
              <span
                className={classes.value}
              >{`${price.amount} ${price.currency.symbol}`}</span>
            ))}
          </div>
          <AddToCartButton
            product={product}
            selectedAttributes={selectedAttributes}
          />

          <p
            data-testid='product-description'
            className={classes['product-description']}
          >
            {product.description}
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(withProducts(ProductDetailPage));
