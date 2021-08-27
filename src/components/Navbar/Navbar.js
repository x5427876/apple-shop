import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/store.png";
import useStyle from "./style";

const Navbar = () => {
  const classes = useStyle();
  const location = useLocation();
  const cartItem = useSelector((state) => state.store.cart.total_items);
  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="inherit"
      >
        <Toolbar className={classes.header}>
          <div className={classes.grow} />
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="commerce.js" height="25px" className={classes.image} />
            Apple Shop
          </Typography>
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inerit"
              >
                <Badge badgeContent={cartItem} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
