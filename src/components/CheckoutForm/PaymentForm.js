import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

import Review from './Review';



const PaymentForm = ({ backStep }) => {

  const stripePromise = loadStripe('...')

  const checkoutToken = useSelector(store => store.checkout.checkoutToken.live)

  return <>
    <Review />
    <Divider />
    <Typography varaint='h6' gutterBottom style={{ margin: '20px 0' }}>付款方式</Typography>
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ elements, stripe }) => (
          <form>
            <CardElement />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button varaint='outlined' onClick={backStep}>返回</Button>
              <Button varaint='contained' type='submit' disableed={!stripe} color='primary'>
                支付 {checkoutToken.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>
        )}
      </ElementsConsumer>
    </Elements>
  </>
};

export default PaymentForm;
