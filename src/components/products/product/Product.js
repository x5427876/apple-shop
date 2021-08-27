import React from "react";
import {
  Card,
  Typography,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useDispatch } from "react-redux";

import useStyle from "./style";
import { addToCart } from "../../../redux/commerceSlice";

const Product = ({ product }) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const onAddToCart = (id, quan) => {
    dispatch(addToCart({ id, quan }));
  };
  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={product.media.source}
          title={product.name}
        />
        <CardContent>
          <div className={classes.cardContent}>
            <Typography
              varaint="h5"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              {product.name}
            </Typography>
            <Typography varaint="h5" style={{ fontWeight: "bold" }}>
              {product.price.formatted_with_code}
            </Typography>
          </div>
          <Typography className={classes.description}
            dangerouslySetInnerHTML={{ __html: product.description }}
            varaint="body2"
            color="textSecondary"
          />
          <CardActions disableSpacing className={classes.cardActions}>
            <IconButton
              aria-label="Add to Cart"
              onClick={() => {
                onAddToCart(product.id, 1);
              }}
            >
              <AddShoppingCart />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
