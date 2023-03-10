import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useStyles } from '../styles';
import axios from 'axios';
import { Store } from '../Store';
import Logo from '../components/Logo';
import { Add, Remove } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function OrderScreen() {
  const { classes } = useStyles();
  const { state, dispatch } = useContext(Store);
  const {
    loading,
    error,
    categories,
    loadingProducts,
    errorProducts,
    products,
  } = state;
  const { itemsCount, totalPrice, taxPrice, orderType } = state.order;
  const {
    order: { orderItems },
  } = state;
  const [categoryName, setCategoryName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  const closeHandler = () => {
    setIsOpen(false);
  };
  const productClickHandler = (p) => {
    setProduct(p);
    setIsOpen(true);
  };
  const addToOrderHandler = () => {
    dispatch({ type: 'ORDER_ADD_ITEM', payload: { ...product, quantity } });
    setIsOpen(false);
  };
  const cancelOrRemoveFromOrder = () => {
    dispatch({ type: 'ORDER_REMOVE_ITEM', payload: product });
    setIsOpen(false);
  };

  const categoryClickHandler = async (name) => {
    setCategoryName(name);
    listProducts(name);
  };
  const previewOrderHandler = () => {
    navigate('/review');
  };

  const listCategories = async () => {
    dispatch({ type: 'CATEGORY_LIST_REQUEST' });
    try {
      const response = await axios.get(
        'https://selforderkiosk1.herokuapp.com/api/categories'
      );
      dispatch({ type: 'CATEGORY_LIST_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'CATEGORY_LIST_FAIL', payload: error.message });
    }
  };

  const listProducts = async (name = '') => {
    dispatch({ type: 'PRODUCT_LIST_REQUEST' });
    try {
      const result = await axios.get(
        `https://selforderkiosk1.herokuapp.com/api/products?category=${name}`
      );
      dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: result.data });
      console.log('cat', result.data);
    } catch (error) {
      dispatch({ type: 'PRODUCT_LIST_FAIL' });
    }
  };

  useEffect(() => {
    listCategories();
    listProducts();
  }, []);
  console.log('orderitems', orderItems);
  console.log('order', state.order);

  return (
    <Box className={classes.root}>
      <Box className={classes.main}>
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
          <Grid item xs={2}>
            <List>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  <ListItemButton
                    className={classes.box1}
                    onClick={() => categoryClickHandler('')}
                  >
                    <ListItem className={classes.box1}>
                      <Logo></Logo>
                    </ListItem>
                  </ListItemButton>
                  {categories.map((category) => (
                    <ListItemButton
                      key={category.id}
                      className={classes.box1}
                      onClick={() => categoryClickHandler(category.name)}
                    >
                      <ListItem className={classes.box1}>
                        <Avatar src={category.image} alt={category.name} />
                      </ListItem>
                    </ListItemButton>
                  ))}
                </>
              )}
            </List>
          </Grid>
          <Grid item xs={10}>
            <Typography gutterBottom className={classes.title} variant="h2">
              {categoryName || 'Main Menu'}
            </Typography>
            <Grid container spacing={1}>
              {loadingProducts ? (
                <CircularProgress />
              ) : errorProducts ? (
                <Alert severity="error">{errorProducts}</Alert>
              ) : (
                products.map((product) => (
                  <Slide key={product.name} direction="up" in={true}>
                    <Grid item md={6}>
                      <Card
                        className={classes.card2}
                        onClick={() => productClickHandler(product)}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt={product.name}
                            image={product.image}
                            className={classes.media}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="body2"
                              color="textPrimary"
                              component="p"
                            >
                              {product.name}
                            </Typography>
                            <Box className={classes.cardFooter}>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                {product.calorie} Cal
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                ${product.price}
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  </Slide>
                ))
              )}
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
                sm: 10,
                md: 0,
                lg: 0,
                xl: 0,
              },
            }}
          >
            <Button
              onClick={() => {
                dispatch({ type: 'ORDER_CLEAR' });
                navigate('/');
              }}
              variant="contained"
              color="primary"
              className={classes.largeButton}
            >
              Cancel Order
            </Button>
            <Button
              onClick={previewOrderHandler}
              variant="contained"
              color="primary"
              disabled={orderItems.length === 0}
              className={classes.largeButton}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
