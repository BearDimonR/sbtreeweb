import React from "react";
import style from "./index.module.scss";
import moment from "moment";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Stack,
} from "@mui/material";

const EventCard = ({ event, onClick }) => {
  const date =
    moment(event.start).format("ll") +
    " - " +
    (event.end ? moment(event.end).format("ll") : "Present");
  return (
    <Card sx={{ maxWidth: 500, height: 425 }}>
      <CardActionArea onClick={() => onClick(event.id)}>
        <CardMedia
          component="img"
          height={250}
          image={event.photo}
          alt={event.name}
        />
        <CardHeader
          title={
            <Typography gutterBottom variant="h6" component="div">
              {event.name}
            </Typography>
          }
          subheader={
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" display="block" gutterBottom>
                {event.category}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                {date}
              </Typography>
            </Stack>
          }
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            className={style.about}
          >
            {event.about}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
