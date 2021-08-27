import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@material-ui/core";

import useStyle from "./style";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { genrateToken, addShippingData } from "../../../redux/paymentSlice";

const steps = ["運送地址", "結帳"];

const Checkout = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((store) => store.store.cart);
  const checkoutTokenId = useSelector(
    (store) => store.checkout.checkoutToken?.id
  );

  useEffect(() => { dispatch(genrateToken({ id: cart.id, type: { type: "cart" } })); }, [cart]);

  const Confirmation = () => <div>Confirmation</div>;

  const Form = () => (activeStep === 0 ? <AddressForm next={next} /> : <PaymentForm backStep={backStep} />);

  const next = (data) => {
    dispatch(addShippingData(data))
    nextStep()
  }

  const nextStep = () => { setActiveStep((prev) => prev + 1) }
  const backStep = () => { setActiveStep((prev) => prev - 1) }

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography varaint="h4" align="center">
            結帳
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutTokenId && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
