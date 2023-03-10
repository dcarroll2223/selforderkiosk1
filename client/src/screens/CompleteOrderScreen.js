import { Box, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Store } from '../Store';
import { useStyles } from '../styles';

export default function CompleteOrderScreen() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { dispatch } = useContext(Store);

  return (
    <Box className={[classes.root, classes.navy]}>
      <Box className={[classes.main, classes.center]}>
        <Box>
          <Logo large></Logo>
          <Typography gutterBottom className={classes.title} variant="h3">
            Your order has been placed
          </Typography>
          <Typography gutterBottom className={classes.title} variant="h3">
            Thank you!
          </Typography>
          <Typography
            gutterBottom
            className={classes.title}
            variant="h3"
            component="h3"
          >
            Your order number is 32433d3d2
          </Typography>
        </Box>
        <Box className={[classes.center, classes.space]}>
          <Button
            onClick={() => {
              dispatch({ type: 'ORDER_CLEAR' });
              navigate('/');
            }}
            variant="contained"
            color="primary"
            className={classes.largeButton}
          >
            Order Again
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
