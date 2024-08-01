import React, { Component } from 'react';
import classes from './ProductGallery.module.scss';

class ProductGallery extends Component {
  state = {
    selectedImageIndex: 0,
  };

  selectImage = (index) => {
    this.setState({ selectedImageIndex: index });
  };

  goPrevious = () => {
    this.setState((prevState) => ({
      selectedImageIndex:
        prevState.selectedImageIndex === 0
          ? this.props.images.length - 1
          : prevState.selectedImageIndex - 1,
    }));
  };

  goNext = () => {
    this.setState((prevState) => ({
      selectedImageIndex:
        (prevState.selectedImageIndex + 1) % this.props.images.length,
    }));
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
              className={
                index === selectedImageIndex ? classes['selected-image'] : ''
              }
              key={img.id + index}
              src={img.url}
              alt={`Thumbnail ${index}`}
              onClick={() => this.selectImage(index)}
            />
          ))}
        </div>
        <div className={classes['main-image']}>
          {images.length > 1 && (
            <button className={classes['arrow-left']} onClick={this.goPrevious}>
              &lt;
            </button>
          )}
          <img src={images[selectedImageIndex].url} alt='Main product' />

          {images.length > 1 && (
            <button className={classes['arrow-right']} onClick={this.goNext}>
              &gt;
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default ProductGallery;
