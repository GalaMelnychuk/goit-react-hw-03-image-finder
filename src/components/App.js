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
    query: "color",
    page: 1,
    isModalOpen: false,
    largeImageUrl: null
  };

  componentDidMount() {
    this.getImages();
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevCategory } = prevState;
    const { query: nextCategory } = this.state;
    window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth"
    });
    if (prevCategory !== nextCategory) {
      this.getImages(nextCategory);
    }
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
      this.setState({ images: newImagesArray})

    } catch (error) {
      console.log("error", error);
    }
  }

  handleSubmitForm = e => {
    e.preventDefault();
    this.setState({ query: e.target.elements[1].value });
    // await this.getImages(e.target.elements[1].value)
    
    e.target.elements[1].value = "";
  };

  // opensModal = () => this.setState({isModalOpen: true})
  // closeModal = () => this.setState({isModalOpen: false})

  setLargeImage = largeImgUrl => {
    this.setState({ largeImageUrl: largeImgUrl });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(state => ({ isModalOpen: !state.isModalOpen }));
  };

  loadMoreImg = async () => {
    await this.setState(prevState => ({ page: prevState.page + 1 }));
    await this.getImages();
  };

  render() {
    const { images, isLoading,  isModalOpen, largeImageUrl} = this.state;
    const loading = isLoading ? <Loader /> : null;

    return (
      <>
        <Searchbar onHandleSubmitForm={this.handleSubmitForm} />
        {loading}
        <ImageGallery images={images} onOpenImage={this.setLargeImage}/>
        <Button onloadMoreImg = {this.loadMoreImg}/>
        {isModalOpen && <Modal url={largeImageUrl} onClose ={this.toggleModal} />}
      </>
    );
  }
}

export default App;
