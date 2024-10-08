import React, { Component } from "react";
import AttributeButton from "../attributeButton/AttributeButton";
import classes from "./ProductAttribute.module.scss";

class ProductAttributes extends Component {
  renderAttributeOptions = (attribute, selectedAttributeId) => {
    return attribute.items.map((item) => (
      <AttributeButton
        size={this.props.size}
        key={item.id}
        item={item}
        attribute={attribute}
        isSelected={selectedAttributeId === item.id}
        onClick={() =>
          this.props.handleAttributeSelect(attribute.name, item.id)
        }
        isColorAttribute={attribute.id === "Color"}
        backgroundColor={attribute.type === "swatch" ? item.value : undefined}
      />
    ));
  };

  render() {
    const { attribute, selectedAttribute, size } = this.props;

    const attributeName = attribute
      ? attribute.name.replace(/\s+/g, "-").toLowerCase()
      : "default-name";
    const productAttrOrCartAttr =
      size === "small" ? "cart-item-attribute" : "product-attribute";

    return (
      <div className={classes.attributes}>
        <h3>{attribute.name}</h3>
        <div
          className={classes["attributes-item"]}
          data-testid={`${productAttrOrCartAttr}-${attributeName}`}
          style={{
            gridTemplateColumns:
              attribute.id === "Color"
                ? "repeat(5, min-content)"
                : "repeat(4, min-content)",
          }}
        >
          {this.renderAttributeOptions(attribute, selectedAttribute)}
        </div>
      </div>
    );
  }
}

export default ProductAttributes;
