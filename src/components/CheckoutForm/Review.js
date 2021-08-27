import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Review = () => {
    const checkoutToken = useSelector(store => store.checkout.checkoutToken.live)


    return (
        <>
            <Typography varaint='h6' gutterBottom>訂單詳情:</Typography>
            <List disablePadding>
                {checkoutToken && checkoutToken.line_items.map(product => (
                    <ListItem style={{ padding: '10px 0' }} key={product.name}>
                        <ListItemText primary={product.name} secondary={`數量: ${product.quantity}`} />
                        <Typography varaint='body2'>{product.line_total.formatted_with_code}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0' }}>
                    <ListItemText primary='總計' />
                    <Typography varaint='subtitle1' style={{ fontWeight: 700 }}>
                        {checkoutToken && checkoutToken.subtotal.formatted_with_code}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}

export default Review
