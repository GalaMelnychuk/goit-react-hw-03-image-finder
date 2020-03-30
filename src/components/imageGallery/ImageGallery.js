import React from "react";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, onOpenImage }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem 
        webUrl={image.webformatURL} 
        key = {image.id} 
        largeUrl={image.largeImageURL} 
        onOpenImage={onOpenImage}/>
      ))}
    </ul>
  );
};

export default ImageGallery;
