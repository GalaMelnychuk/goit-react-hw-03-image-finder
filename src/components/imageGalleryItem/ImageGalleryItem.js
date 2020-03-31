import React from "react";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({webUrl, largeUrl, onOpenImage}) => {
  return (
    <li className={styles.ImageGalleryItem} >
      <img
        src={webUrl}
        alt="img"
        className={styles.ImageGalleryItemImage}
        onClick={()=>onOpenImage(largeUrl)}
      />
    </li>
  );
};

export default ImageGalleryItem;
