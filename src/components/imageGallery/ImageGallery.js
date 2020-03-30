import React, {Component} from "react";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../imageGalleryItem/ImageGalleryItem";


export default class ImageGallery extends Component {

componentDidUpdate() {

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth"
  }); 
}
  
  render () { 
    return (
    <ul className={styles.ImageGallery}>
      {this.props.images.map(image => (
        <ImageGalleryItem 
        webUrl={image.webformatURL} 
        key = {image.id} 
        largeUrl={image.largeImageURL} 
        onOpenImage={this.props.onOpenImage}/>
      ))}
    </ul>
  );}
};

