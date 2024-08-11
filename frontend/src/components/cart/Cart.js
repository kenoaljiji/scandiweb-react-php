import React, { Component } from 'react';
import { CartContext } from '../../context/CartContext';
import { toCamelCase } from '../../helpers/initializeAttribute';
import Loader from '../loader/Loader';
import ProductAttributes from '../productAttribute/ProductAttribute';
import classes from './Cart.module.scss';

class Cart extends Component {
  static contextType = CartContext;

  render() {
    const {
      cartItems,
      total,
      removeFromCart,
      addToCart,
      placeOrder,
      totalItems,
      loading,
    } = this.context;

    return (
      <div className={classes.cart}>
        <div>
          {totalItems > 0 ? (
            <h4>
              <span>My Bag, </span> {totalItems}{' '}
              {totalItems > 1 ? 'items' : 'item'}
            </h4>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        {cartItems?.map((item, index) => (
          <div key={item.id + index} className={classes['cart-items']}>
            <div
              className={classes['cart-item-details']}
              style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}
            >
              <div
                className={classes['item-1']}
                data-testid={`product-${item.name
                  .toLowerCase()
                  .replace(/ /g, '-')}`}
              >
                <h4>{item.name}</h4>
                {item.prices.map((price, index) => (
                  <span key={index + price.amount} className={classes.price}>
                    {price.amount.toFixed(2)}
                    {price.currency.symbol}
                  </span>
                ))}

                {item.attributes?.map((attr) => (
                  <div className={classes.attribute}>
                    <ProductAttributes
                      key={attr.name + attr.id}
                      attribute={attr}
                      selectedAttribute={
                        item.selectedAttributes[toCamelCase(attr.name)]
                      }
                      handleAttributeSelect={(name, value) =>
                        this.handleAttributeSelection(item.id, name, value)
                      }
                      size='small'
                    />
                  </div>
                ))}
              </div>

              <div className={classes['quality-controls']}>
                <button onClick={() => addToCart(item)}>+</button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    removeFromCart(item.id, item.selectedAttributes)
                  }
                >
                  -
                </button>
              </div>
              <div>
                <img
                  src={item.gallery[0].url}
                  alt={item.name}
                  className={classes['cart-item-image']}
                />
              </div>
            </div>
          </div>
        ))}

        <div className={classes.total}>
          <span>Total:</span> <span>${total.toFixed(2)}</span>
        </div>
        {totalItems > 0 && (
          <div className={classes['loader-container']}>
            <div className={classes.loader}>{loading && <Loader />}</div>
            <button
              className={classes['place-order-button']}
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
