import React, { Component } from 'react';
import classes from './ProductAttribute.module.scss';

class ProductAttributes extends Component {
  renderAttributeOptions = (attribute) => {
    const selectedItemId = this.props.selectedAttributes[attribute.name];

    console.log(attribute);

    return attribute.items.map((item) => (
      <button
        key={item.id}
        className={`${
          attribute.id === 'Color'
            ? classes['attributes-color']
            : classes['attributes-size']
        } 
                    ${selectedItemId === item.id ? classes['selected'] : ''} 
                    ${
                      attribute.id === 'Color' ? classes['color-attribute'] : ''
                    }`}
        onClick={() => this.props.onSelect(attribute.name, item.id)}
        style={
          attribute.type === 'swatch' ? { backgroundColor: item.value } : {}
        }
        data-testid={`product-attribute-${attribute.name
          .replace(/\s+/g, '-')
          .toLowerCase()}`}
      >
        {attribute.type !== 'swatch' ? item.value : null}
      </button>
    ));
  };

  render() {
    const { attributes } = this.props;
    return (
      <div>
        {attributes?.map((attr, index) => (
          <div key={attr.id + index} className={classes.attributes}>
            <h3>{attr.name}</h3>
            <div className={classes['attributes-item']}>
              {this.renderAttributeOptions(attr)}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;
