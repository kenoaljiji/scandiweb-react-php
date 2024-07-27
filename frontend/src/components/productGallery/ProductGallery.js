import React, { Component } from 'react';
import classes from './ProductGallery.module.scss';

class ProductGallery extends Component {
  state = {
    selectedImageIndex: 0,
  };

  selectImage = (index) => {
    this.setState({ selectedImageIndex: index });
  };

  render() {
    const { images } = this.props;

    if (!images || images.length === 0) {
      return <p>There is no product here.</p>; // Displaying a fallback message
    }

    const { selectedImageIndex } = this.state;

    return (
      <div
        data-testid={'product-gallery'}
        className={classes['product-gallery']}
      >
        <div className={classes['thumbnails-image']}>
          {images?.map((img, index) => (
            <img
              key={img.id + index}
              src={img.url}
              alt={`Thumbnail ${index}`}
              onClick={() => this.selectImage(index)}
            />
          ))}
        </div>
        <div className={classes['main-image']}>
          <img src={images[selectedImageIndex].url} alt='Main product' />
        </div>
      </div>
    );
  }
}

export default ProductGallery;
