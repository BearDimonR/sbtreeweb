import React from "react";
import style from "./index.module.scss";
import { Image, Statistic, Header } from "semantic-ui-react";
import Map from "../../components/Map";

const AboutPage = () => {
  return (
    <div className={style.container}>
      <div className={style.imageWrapper}>
        <Image className={style.image} src="/logo.png" />
      </div>
      <div>
        <Header as="h1">Спудейське Братство НаУКМА</Header>
        <Header as="h3">Творимо Могилянку з 1997</Header>
      </div>
      <div className={style.statistic}>
        <Statistic.Group widths="two">
          <Statistic color="blue">
            <Statistic.Value>20+</Statistic.Value>
            <Statistic.Label>Проєктів за рік</Statistic.Label>
          </Statistic>

          <Statistic color="blue">
            <Statistic.Value>100</Statistic.Value>
            <Statistic.Label>Активних членів</Statistic.Label>
          </Statistic>

          <Statistic color="blue">
            <Statistic.Value>34</Statistic.Value>
            <Statistic.Label>Висвячених</Statistic.Label>
          </Statistic>

          <Statistic color="blue">
            <Statistic.Value>200</Statistic.Value>
            <Statistic.Label>Пошанованих</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
      <div className={style.map}>
        <Map
          className={style.map}
          location={{
            lat: 50.4661491545229,
            lng: 30.522968294767207,
            address: "NaUKMA Building 4",
          }}
        />
      </div>
    </div>
  );
};

export default AboutPage;
