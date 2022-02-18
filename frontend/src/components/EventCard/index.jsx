import React from "react";
import style from "./index.module.scss";
import moment from "moment";

const EventCard = ({ user, event, onClick }) => {
  return (
    <article className={style.card} onClick={(e) => onClick(event.id)}>
      <header
        className={style.cardHeader}
        style={{ backgroundImage: `url(${event.photo})` }}
      >
        <h4 className={style.cardHeaderTitle}>{event.category}</h4>
      </header>
      <div className={style.cardBody}>
        <p className={style.date}>
          {moment(event.start).format("ll")} -{" "}
          {event.end ? moment(event.end).format("ll") : "Present"}
        </p>
        <h2>{event.name}</h2>
        <p className={style.bodyContent}>{event.about}</p>
      </div>
    </article>
  );
};

export default EventCard;
