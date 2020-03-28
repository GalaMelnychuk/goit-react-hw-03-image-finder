import React, { Component } from "react";
import axios from "axios";

import Searchbar from "./searchbar/Searchbar";
import ImageGallery from "./imageGallery/ImageGallery";
import Loader from "./loader/Loader";
// import Button from "./button/Button";
// import Modal from "./modal/Modal";
const KEY = "15738789-70e175d37a04d1dee6d70d765";

// const mapper = images => {
//   return images.map(({ objectID: id, url: link, ...props }) => ({
//     id,
//     link,
//     ...props,
//   }));
// };

class App extends Component {
  state = {
    images: [],
    isLoading: false,

  };

  componentDidMount() {
    this.getImages();
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevCategory } = prevState;
    const { query: nextCategory } = this.state;

    if (prevCategory !== nextCategory) {
      this.getImages(nextCategory);
    }
  }

  async getImages (searchQueryImages = "cat") {
    this.setState({
      isLoading: true
    });
    try { const res = await axios
    .get(
      `https://pixabay.com/api/?key=${KEY}&q=${searchQueryImages}&image_type=photo`
    )
    .finally(() => {
      this.setState({isLoading: false})
    })
    
    this.setState({ images: res.data.hits})}

    catch (error) {
      console.log('error', error)
    }
   
  };

  handleSubmitForm = e => {
    this.getImages(e.target.elements[1].value)
    // console.log('e.target.value', e.target.value)
    e.preventDefault();
    e.target.elements[1].value=""
  };

  render() {
    const { images, isLoading} = this.state;
    const loading = isLoading ? <Loader /> : null
   
    return (
      <>
        {loading}
        <Searchbar onHandleSubmitForm={this.handleSubmitForm} />
        <ImageGallery images={images} />
       
      </>
    );
  }
}

export default App;
