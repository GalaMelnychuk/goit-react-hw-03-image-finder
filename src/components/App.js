import React, { Component } from "react";
import axios from "axios";

import Searchbar from "./searchbar/Searchbar";
import ImageGallery from "./imageGallery/ImageGallery";
import Loader from "./loader/Loader";
// import Button from "./button/Button";
// import Modal from "./modal/Modal";
const KEY = "15738789-70e175d37a04d1dee6d70d765";

class App extends Component {
  state = {
    images: [],
    query: "cat",
    isLoading: false,
  };

  async getImages () {
    this.setState({
      isLoading: true
    });
    try { const res = await axios
    .get(
      `https://pixabay.com/api/?key=${KEY}&q=${this.state.query}&image_type=photo`
    )
    .finally(() => {
      this.setState({isLoading: false})
    })
    
    // let imgArray = res.data.hits ? Object.keys(res.data.hits).map(key => {
    //   return {...res.data.hits[key]}
    // }) : [];
    this.setState({ images: res.data.hits})
    console.log('imgArray', res.data.hits)}


    catch (error) {
      console.log('error', error)
    }
   
  };

  handleSubmitForm = e => {
    this.getImages();
    e.preventDefault();
    this.setState({ query:  e.target.elements[1].value });
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
