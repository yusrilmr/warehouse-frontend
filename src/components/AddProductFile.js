import React, { useState } from 'react';
import PropTypes from "prop-types";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const AddProductFile = (props) => {
    const [open, setOpen] = useState(false);

    // Open the modal form
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    // Save product and close modal form
    const handleSave = () => {
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
                Upload
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Product</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AddProductFile;
AddProductFile.propTypes = {
    addProduct: PropTypes.func
}