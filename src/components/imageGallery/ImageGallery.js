import React from "react";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ images, key }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem url={image.webformatURL} key = {image.id}/>
      ))}
    </ul>
  );
};

export default ImageGallery;
