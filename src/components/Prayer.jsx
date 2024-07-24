import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import fajr from "./../assets/images/fajr-prayer.png"

export default function MediaCard({name, time, image}) {
  return (
    <Card sm={{ width: "80%" , marginInline: "auto"}} style={{marginBottom: "10px"}}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{fontFamily: "IBM Plex Sans Arabic, sans-serif"}}>
          {name}
        </Typography>
        <Typography variant="h2" color="text.secondary" style={{fontFamily: "IBM Plex Sans Arabic, sans-serif"}}>
            {time}
        </Typography>
      </CardContent>
    </Card>
  );
}