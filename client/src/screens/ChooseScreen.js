import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Store } from '../Store';
import { useStyles } from '../styles';

export default function ChooseScreen() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { dispatch } = useContext(Store);
  const chooseHandler = (orderType) => {
    dispatch({ type: 'ORDER_SET_TYPE', payload: orderType });
    console.log(orderType);
    navigate('/order');
  };

  return (
    <Fade in={true}>
      <Box
        className={[classes.root, classes.navy]}
        sx={{
          backgroundColor: {
            xs: '#fff',
            sm: '#003080',
            md: '#003080',
            lg: '#003080',
            xl: '#003080',
          },
        }}
      >
        <Box className={[classes.main, classes.center]}>
          <Logo large></Logo>
          <Typography
            variant="h3"
            className={classes.center}
            sx={{
              color: {
                xs: '#000',
                sm: '#fff',
                md: '#fff',
                lg: '#fff',
                xl: '#fff',
              },
            }}
            gutterBottom
          >
            Where will you be eating today?
          </Typography>
          <Box className={classes.cards}>
            <Card
              className={classes.card3}
              sx={{
                margin: {
                  xs: 0.2,
                  sm: 2,
                  md: 2,
                  lg: 2,
                  xl: 2,
                },
              }}
            >
              <CardActionArea onClick={() => chooseHandler('Dine In')}>
                <CardMedia
                  component="img"
                  alt="Dine In"
                  image="/images/eatin.png"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    color="textPrimary"
                    component="p"
                  >
                    Dine In
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              className={classes.card3}
              sx={{
                margin: {
                  xs: 0,
                  sm: 2,
                  md: 2,
                  lg: 2,
                  xl: 2,
                },
              }}
            >
              <CardActionArea onClick={() => chooseHandler('Takeout')}>
                <CardMedia
                  component="img"
                  alt="Takeout"
                  image="/images/takeout.png"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h4"
                    color="textPrimary"
                    component="p"
                  >
                    Takeout
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}
