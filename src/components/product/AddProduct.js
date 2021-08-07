/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from "prop-types";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AddProduct = (props) => {
    const [open, setOpen] = useState(false);
    const [errorNameText, setErrorNameText] = useState('');
    const [product, setProduct] = useState({
        name: '', contain_products: []
    });

    const emptyErrorText = () => {
        setErrorNameText('')
    };

    // Open the modal form
    const handleClickOpen = () => {
        emptyErrorText();
        setOpen(true);
    };

    // Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setProduct({...product, [event.target.name]: event.target.value});
    };

    // Save product and close modal form
    const handleSave = () => {
        if (isValid()) {
            props.addProduct(product);
            handleClose();
        }
    };

    const isValid = () => {
        emptyErrorText();
        let valid = true;
        if (product.name === "") {
            setErrorNameText('This field is mandatory');
            valid = false;
        }
        return valid;
    };

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
                Add Product
            </Button>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
                <DialogTitle>Add Product</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required fullWidth label="Name" name="name"
                               value={product.name} onChange={handleChange}
                               error ={!!errorNameText.length} helperText={errorNameText} />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AddProduct;
AddProduct.propTypes = {
    addProduct: PropTypes.func
};