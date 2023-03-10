import { Add, Remove } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  Grid,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Store } from '../Store';
import { useStyles } from '../styles';

export default function ReviewScreen() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { orderItems, itemsCount, totalPrice, taxPrice, orderType } =
    state.order;

  const closeHandler = () => {
    setIsOpen(false);
  };
  const addToOrderHandler = () => {
    dispatch({ type: 'ORDER_ADD_ITEM', payload: { ...product, quantity } });
    setIsOpen(false);
  };
  const cancelOrRemoveFromOrder = () => {
    dispatch({ type: 'ORDER_REMOVE_ITEM', payload: product });
    setIsOpen(false);
  };
  const productClickHandler = (p) => {
    setProduct(p);
    setIsOpen(true);
  };
  const proceedToCheckoutHandler = () => {
    navigate('/complete');
  };

  return (
    <Box className={[classes.root]}>
      <Box className={[classes.main, classes.navy, classes.center1]}>
        <Dialog
          onClose={closeHandler}
          aria-labelledby="max-width-dialog-title"
          open={isOpen}
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle className={classes.center}>
            Add {product.name}
          </DialogTitle>
          <Box className={[classes.row, classes.center]}>
            <Button
              variant="contained"
              color="primary"
              disabled={quantity === 1}
              onClick={(e) => quantity > 1 && setQuantity(quantity - 1)}
            >
              <Remove />
            </Button>
            <TextField
              inputProps={{ className: classes.largeInput }}
              InputProps={{
                bar: 'true',
                inputProps: {
                  className: classes.largeInput,
                },
              }}
              className={classes.largeNumber}
              type="number"
              variant="filled"
              min={1}
              value={quantity}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => setQuantity(quantity + 1)}
            >
              <Add />
            </Button>
          </Box>
          <Box className={[classes.row, classes.around]}>
            <Button
              onClick={cancelOrRemoveFromOrder}
              variant="contained"
              color="primary"
              size="large"
              className={classes.largeButton}
            >
              {orderItems.find((x) => x.name === product.name)
                ? 'Remove From Order'
                : 'Cancel'}
            </Button>
            <Button
              onClick={addToOrderHandler}
              variant="contained"
              color="primary"
              size="large"
              className={classes.largeButton}
            >
              ADD To Order
            </Button>
          </Box>
        </Dialog>
        <Grid container>
          <Grid item xs={12}>
            <Logo large></Logo>
            <Typography gutterBottom className={classes.title} variant="h3">
              Review my {orderType} order
            </Typography>
            <Grid container spacing={1}>
              {orderItems.map((orderItem) => (
                <Slide key={orderItem.name} direction="up" in={true}>
                  <Grid item xs={12}>
                    <Card
                      className={classes.card}
                      onClick={() => productClickHandler(orderItem)}
                    >
                      <CardActionArea>
                        <CardContent>
                          <Box className={[classes.row, classes.between]}>
                            <Typography
                              gutterBottom
                              variant="body2"
                              color="textPrimary"
                              component="p"
                            >
                              {orderItem.name}
                            </Typography>
                            <Button
                              variant="contained"
                              onClick={() => productClickHandler(orderItem)}
                            >
                              Edit
                            </Button>
                          </Box>
                          <Box className={[classes.row, classes.between]}>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {orderItem.calorie} Cal
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textPrimary"
                              component="p"
                            >
                              {orderItem.quantity} x ${orderItem.price}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Slide>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box>
          <Box className={[classes.bordered, classes.space]}>
            My Order - {orderType} | Tax: ${taxPrice?.toFixed(2)} | Total: $
            {totalPrice?.toFixed(2)} | Items: {itemsCount}
          </Box>
          <Box
            className={[classes.row, classes.around]}
            sx={{
              paddingBottom: {
                xs: 10,
                lg: 0,
              },
            }}
          >
            <Button
              onClick={() => {
                navigate('/order');
              }}
              variant="contained"
              color="primary"
              className={classes.largeButton}
            >
              Back
            </Button>
            <Button
              onClick={proceedToCheckoutHandler}
              variant="contained"
              color="secondary"
              disabled={orderItems.length === 0}
              className={classes.largeButton}
            >
              Place Order
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
