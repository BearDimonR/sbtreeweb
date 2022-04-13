import React from "react";
import style from "./index.module.scss";
import moment from "moment";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  Typography,
  Stack,
  CardContent,
} from "@mui/material";

const PersonCard = ({ person, onClick }) => {
  const date =
    moment(person.start).format("ll") +
    " - " +
    (person.end ? moment(person.end).format("ll") : "Present");
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
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            className={style.about}
          >
            {person.about} {person.about} {person.about} {person.about}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PersonCard;
