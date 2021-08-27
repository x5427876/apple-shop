import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  InputLabel,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import FormInput from "./FormInput";
import { fetchShippingCountries, fetchSubdivisions, fetchShippingOptions } from "../../redux/paymentSlice";

const AddressForm = ({ next }) => {
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOption, setShippingOption] = useState('');

  const methods = useForm();
  const dispatch = useDispatch();

  const checkoutTokenId = useSelector((store) => store.checkout.checkoutToken.id);
  const shippingCountries = useSelector((store) => store.checkout.shippingCountries);
  const shippingSubdivisions = useSelector((store) => store.checkout.shippingSubdivisions)
  const shippingOptions = useSelector((store) => store.checkout.shippingOptions)

  const countries = shippingCountries ? Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })) : null
  const subdivisions = shippingSubdivisions ? Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })) : null
  const options = shippingOptions?.map((so) => ({ id: so.id, label: `${so.description} - (${so.price.formatted_with_code})` }))

  useEffect(() => { dispatch(fetchShippingCountries(checkoutTokenId)); }, []);
  useEffect(() => { shippingCountry && dispatch(fetchSubdivisions(shippingCountry)); }, [shippingCountry]);
  useEffect(() => { shippingSubdivision && dispatch(fetchShippingOptions({ id: checkoutTokenId, country: shippingCountry, region: shippingSubdivision })); }, [shippingSubdivision]);

  return (
    <>
      <Typography varaint="h6">運送地址</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="姓氏" />
            <FormInput required name="lastName" label="名字" />
            <FormInput required name="address1" label="地址" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="zip" label="區碼 / 郵遞區號" />
            <Grid item xs={12} sm={6}>
              <InputLabel>國家</InputLabel>
              <Select
                value={shippingCountries}
                fullWidth
                onChange={(e) => {
                  setShippingCountry(e.target.value);
                }}
              >
                {countries && countries.map((country) => (<MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>縣市</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => { setShippingSubdivision(e.target.value); }}
              >
                {subdivisions && subdivisions.map((subdivision) => (<MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>))}
              </Select>
            </Grid><Grid item xs={12} sm={6}>
              <InputLabel>運費</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => { setShippingOption(e.target.value); }}
              >
                {options && options.map((option) => (<MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }} >
            <Button component={Link} to='/cart' varaint='outlined'>返回</Button>
            <Button type='submit' varaint='contained' color='primary'>下一步</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
