import React, { Component } from "react";
import classes from "./AttributeButton.module.scss";

class AttributeButton extends Component {
  render() {
    const {
      item,
      isSelected,
      onClick,
      isColorAttribute,
      backgroundColor,
      size,
      attribute,
    } = this.props;
    // Prepare a readable item name for use in data-testid

    const itemName = item
      ? item.value.replace(/\s+/g, "-")
      : "default-attribute-value";

    const attributeName = attribute
      ? attribute?.name.replace(/\s+/g, "-").toLowerCase()
      : "default-attribute-name";

    const productAttrOrCartAttr =
      size === "small" ? "cart-item-attribute" : "product-attribute";

    const dataTestId = `${productAttrOrCartAttr}-${attributeName}-${itemName}${
      isSelected ? "-selected" : ""
    }`;

    // Collect all applicable class names based on conditions
    let buttonClasses = [
      isColorAttribute
        ? classes["attributes-color"]
        : classes["attributes-size"], // Base className
      isSelected
        ? isColorAttribute
          ? classes["selected-color"]
          : classes["selected"]
        : "", // Selected state
      isColorAttribute ? classes["color-attribute"] : "", // Special className for color attributes
      size === "small" ? classes["small"] : "", // Small size className
    ].filter(Boolean); // Filter out empty strings to clean up the final class string

    // Convert the array of class names into a single string
    const buttonClass = buttonClasses.join(" ");

    return (
      <button
        className={buttonClass}
        onClick={onClick}
        style={backgroundColor ? { backgroundColor } : {}}
        disabled={size === "small" ? true : false}
        data-testid={dataTestId}
      >
        {isColorAttribute ? null : item.value}
      </button>
    );
  }
}

export default AttributeButton;
