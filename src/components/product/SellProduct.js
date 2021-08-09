/* eslint-disable */
import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const SellProduct = (props) => {
    const [open, setOpen] = useState(false);
    const [errorTotalSellText, setErrorTotalSellText] = useState('');
    const [totalSell, setTotalSell] = useState(0);

    const emptyErrorText = () => {
        setErrorTotalSellText('');
    };

    // Open the modal form
    const handleClickOpen = () => {
        emptyErrorText();
        setTotalSell(0);
        setOpen(true);
    };

    // Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setTotalSell(event.target.value);
    };

    const handleSave = () => {
        if (isValid()) {
            props.sellProduct(props.productId, totalSell);
            handleClose();
        }
    };

    const isValid = () => {
        emptyErrorText();
        let valid = true;
        if (totalSell < 0) {
            setErrorTotalSellText("This field cannot be less than 0")
            valid = false;
        }
        if (totalSell == '') {
            setErrorTotalSellText("This field is mandatory")
            valid = false;
        }
        if (totalSell > props.product.quantity) {
            setErrorTotalSellText("It cannot be more than " + props.quantity)
            valid = false;
        }
        return valid;
    };

    return (
        <div>
            <Button size="small" color="primary" disabled={props.quantity <= 0} onClick={handleClickOpen}>
                Sell
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Sell Product</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth label="How many?" name="totalSell"
                               type="number" value={totalSell} onChange={handleChange}
                               error ={!!errorTotalSellText.length} helperText={errorTotalSellText}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Sell</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default SellProduct;
