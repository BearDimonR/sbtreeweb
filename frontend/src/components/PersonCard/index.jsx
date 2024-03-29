import React from "react";
import style from "./index.module.scss";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  Typography,
  Stack,
  CardContent,
} from "@mui/material";
import { stringToDate } from "../../helpers/constants";

const PersonCard = ({ person, onClick }) => {
  const date =
    stringToDate(person.dateIn) +
    " - " +
    (person.dateOut ? stringToDate(person.dateOut) : "Present");
  return (
    <Card sx={{ minWidth: 250, maxWidth: 450, height: 380 }}>
      <CardActionArea onClick={() => onClick(person.id)}>
        <CardMedia
          component="img"
          height={220}
          image={
            person.avatar ||
            "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
          }
          alt={`${person.surname} ${person.name}`}
        />
        <CardHeader
          title={
            <Typography gutterBottom variant="h6" component="div">
              {person.surname} {person.name}
            </Typography>
          }
          subheader={
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" display="block" gutterBottom>
                {person.status}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                {date}
              </Typography>
            </Stack>
          }
        />
        <CardContent className={style.cardContent}>
          <Typography
            variant="body2"
            color="text.secondary"
            className={style.about}
          >
            {person.about}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PersonCard;
