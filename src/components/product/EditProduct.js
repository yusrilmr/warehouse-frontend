/* eslint-disable */
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

const EditProduct = (props) => {
    const [open, setOpen] = useState(false);
    const [errorNameText, setErrorNameText] = useState('');
    const [product, setProduct] = useState({
        name: ''
    });

    const emptyErrorText = () => {
        setErrorNameText('')
    };

    const handleClickOpen = () => {
        emptyErrorText();
        setProduct({
            name: props.product.productName
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setProduct({...product, [event.target.name]: event.target.value});
    };

    // Update product and close modal form
    const handleSave = () => {
        if (isValid()) {
            props.updateProduct(product, props.link);
            handleClose();
        }
    };

    const isValid = () => {
        emptyErrorText();
        let valid = true;
        if (product.name === "") {
            setErrorNameText("This field is mandatory");
            valid = false;
        }
        return valid;
    }

    return (
        <div>
            <Button color="primary" size="small" onClick={handleClickOpen}>Edit</Button>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required fullWidth label="Name" name="name"
                               value={product.name} onChange={handleChange}
                               error ={!!errorNameText.length} helperText={errorNameText}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default EditProduct;