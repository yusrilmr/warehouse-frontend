import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AddProduct = (props) => {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState({
        name: '', contain_products: []
    });

    // Open the modal form
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setProduct({...product, [event.target.name]: event.target.value});
    }

    // Save product and close modal form
    const handleSave = () => {
        props.addProduct(product);
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
                New Product
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Product</DialogTitle>
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
export default AddProduct;