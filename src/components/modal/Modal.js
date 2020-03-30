import React, { Component, createRef } from "react";
import styles from "./Modal.module.css";

export default class Modal extends Component {
  // backdropRef = createRef();

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillMount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  // handleKeyPress = e => {
  //   if (e.code !== 'Escape') return;
  //   this.props.onOpen() 
  // }

  // handleBackdropClick = e => {
  //   const { current } = this.backdropRef;

  //   if (current && e.target !== current) {
  //     return;
  //   }

  //   this.props.onClose();
  // };

  // render() {
  //   return (
  //     <div className={styles.Overlay} ref = {this.backdropRef}
  //     onClick={this.handleBackDropClick}>
  //       <div className={styles.Modal}>
  //         <img src={this.props.largeImageUrl} alt="" />
  //       </div>
  //     </div>
  //   );
  // }

  handleKeyDown = ({ key }) => {
    if (key === "Escape") {
      this.props.onClose();
    }
  };

  closeOnClick = e => {
    if (e.code !== 'Escape') 
    return;
    this.props.onClose();
    
  };

  render() {
    const { url } = this.props;
    console.log('url', url)
    return (
      <div className={styles.Overlay}>
        <div onClick={this.closeOnClick} className={styles.Modal}>
          <img src={url} alt="img" />
        </div>
      </div>
    );
  }
}

