import React from "react";
import styles from "./ImageGalleryItem.module.css";


const ImageGalleryItem = ({url}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={url}
        alt="img"
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
