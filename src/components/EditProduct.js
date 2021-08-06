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
    const [product, setProduct] = useState({
        name: ''
    });
    const handleClickOpen = () => {
        setProduct({
            name: props.product.name
        })
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setProduct({...product, [event.target.name]: event.target.value});
    }
    // Update product and close modal form
    const handleSave = () => {
        props.updateProduct(product, props.link);
        handleClose();
    }
    return (
        <div>
            <Button color="primary" size="small" onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth label="Name" name="name"
                               value={product.name} onChange={handleChange}/>
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