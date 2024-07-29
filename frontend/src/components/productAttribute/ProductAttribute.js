import React, { Component } from 'react';
import {
  normalizeAttributeName,
  toCamelCase,
} from '../../helpers/normalizeAttributeName';
import AttributeButton from '../attributeButton/AttributeButton';

import classes from './ProductAttribute.module.scss';

class ProductAttributes extends Component {
  renderAttributeOptions = (attribute) => {
    const attributeCamelCaseName = toCamelCase(attribute.name);
    const selectedItemId =
      this.props.selectedAttributes[attributeCamelCaseName];
    return attribute.items.map((item) => (
      <AttributeButton
        key={item.id}
        item={item}
        isSelected={selectedItemId === item.id}
        onClick={() => this.props.onSelect(attributeCamelCaseName, item.id)}
        isColorAttribute={attribute.id === 'Color'}
        backgroundColor={attribute.type === 'swatch' ? item.value : undefined}
      />
    ));
  };

  render() {
    const { attributes } = this.props;

    return (
      <div>
        {attributes?.map((attr, index) => (
          <div
            key={attr.id + index}
            className={classes.attributes}
            data-testid={`product-attribute-${attr.name
              .toLowerCase()
              .replace(/\s+/g, '-')}`}
          >
            <h3>{attr.name}</h3>
            <div
              className={classes['attributes-item']}
              style={{
                gridTemplateColumns:
                  attr.id === 'Color'
                    ? 'repeat(5, min-content)'
                    : 'repeat(4, min-content)',
              }}
            >
              {this.renderAttributeOptions(attr)}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductAttributes;
