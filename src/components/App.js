import React, { Component } from "react";
import axios from "axios";
import Searchbar from "./searchbar/Searchbar";
import ImageGallery from "./imageGallery/ImageGallery";
import Loader from "./loader/Loader";
import Button from "./button/Button";
import Modal from "./modal/Modal";
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
    query: "",
    page: 1,
    isModalOpen: false,
    largeImageUrl: ''
  };


  componentDidUpdate(prevProps, prevState) {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
      });
  }

  async getImages() {
    this.setState({
      isLoading: true
    });
    try {
      const res = await axios
        .get(
          `https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .finally(() => {
          this.setState({ isLoading: false });
        });
        
        const newImagesArray = res.data.hits;
      this.setState(prevState => ({ images: [...prevState.images, ...newImagesArray]}))

    } catch (error) {
      console.log("error", error);
    }
  }

  handleSubmitForm = async e => {
    e.preventDefault();
   await this.setState({ images: [] });
   await this.getImages();
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value }) 
  }

  setLargeImage = largeImgUrl => {
  this.setState({ largeImageUrl: largeImgUrl });
  this.toggleModal();
  };

  toggleModal = () => {
    this.setState(state => ({ isModalOpen: !state.isModalOpen }));
  };

  loadMoreImg = async () => {
    await this.setState(prevState => ({ page: prevState.page + 1}));
    await this.getImages();
  };

  render() {
    const { images, isLoading,  isModalOpen, largeImageUrl} = this.state;
    return (
      <>
        <Searchbar onHandleSubmitForm={this.handleSubmitForm} onHandleChange={this.handleChange} />
       { isLoading ? <Loader /> :
        <ImageGallery images={images} onOpenImage={this.setLargeImage}/>}
        {images.length > 0 && <Button onloadMoreImg = {this.loadMoreImg}/>}
        {isModalOpen && <Modal url={largeImageUrl} onClose ={this.toggleModal} />}
      </>
    );
  }
}

export default App;
