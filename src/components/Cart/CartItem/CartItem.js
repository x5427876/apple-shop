import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyle from "./style";
import { updateCartQty, removeFromCart } from "../../../redux/commerceSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const classes = useStyle();

  const handleUpdateCartQty = (id, quan) => {
    dispatch(updateCartQty({ id, quan }));
  };
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.CardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => {
              handleUpdateCartQty(item.id, item.quantity - 1);
            }}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => {
              handleUpdateCartQty(item.id, item.quantity + 1);
            }}
          >
            +
          </Button>
          <Button
            varaint="contained"
            type="button"
            color="secondary"
            onClick={() => {
              handleRemoveFromCart(item.id);
            }}
          >
            移除
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CartItem;
