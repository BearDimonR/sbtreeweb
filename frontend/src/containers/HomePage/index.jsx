import React from "react";
import style from "./index.module.scss";
import { Carousel, Header } from "rsuite";

const HomePage = () => {
  return (
    <div className={style.homeContainer}>
      <Header as="h1" className={style.title}>
        Ми СБ і ми круті!
      </Header>
      <Carousel className={style.carousel} autoplay shape="bar">
        <img src="https://i.imgur.com/reeHIuU.jpg" alt="First in carousel" />
        <img src="https://i.imgur.com/FCl6TzK.jpg" alt="Second in carousel" />
        <img src="https://i.imgur.com/vO4EkTQ.jpg" alt="Third in carousel" />
        <img src="https://i.imgur.com/SmQq03w.jpg" alt="Fourth in carousel" />
        <img src="https://i.imgur.com/UcrN51E.jpg" alt="Fifth in carousel" />
      </Carousel>
    </div>
  );
};

export default HomePage;
