import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import useStyle from "./style";
import CartItem from "./CartItem/CartItem";
import { emptyCart } from "../../redux/commerceSlice";

const Cart = () => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const isEmpty = useSelector((store) => store.store.cart.line_items?.length === 0);
  const cart = useSelector((store) => store.store.cart);

  const EmptyCart = () => {
    return (
      <Typography varaint="subtitle1">
        購物車是空的喔😅
        <Link to="/" className={classes.link}>
          {` 點我去去買東西`}
        </Link>
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items?.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CartItem item={item} />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography varaint="h4" className={classes.boldFont}>
            總計: {cart.subtotal?.formatted_with_code}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              varaint="contained"
              color="secondary"
              onClick={() => {
                dispatch(emptyCart());
              }}
            >
              清空
            </Button>
            <Button
              className={classes.checkButton}
              size="large"
              type="button"
              varaint="contained"
              color="primary"
              component={Link}
              to="/checkout"
            >
              結帳
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <Container style={{ marginTop: '50px' }}>
        <div className={classes.toolbar} />
        <Typography className={classes.title} varaint="h3" gutterBottom>
          🛒購物車
        </Typography>
        {isEmpty ? <EmptyCart /> : <FilledCart />}
      </Container>
    </div>
  );
};

export default Cart;
