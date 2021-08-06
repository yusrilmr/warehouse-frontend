import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const AddArticle = (props) => {
    const [open, setOpen] = useState(false);
    const [article, setArticle] = useState({ identification: '', name: '', stock: 0 });

    // Open the modal form
    const handleClickOpen = () => {
        setArticle({ identification: '', name: '', stock: 0 })
        setOpen(true);
    };

    // Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setArticle({...article, [event.target.name]: event.target.value});
    }

    // Save article and close modal form
    const handleSave = () => {
        props.addArticle(article);
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
                New Article
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Article</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth label="Identification" name="identification"
                               value={article.identification} onChange={handleChange}/>
                    <TextField fullWidth label="Name" name="name"
                               value={article.name} onChange={handleChange}/>
                    <TextField fullWidth label="Stock" name="stock"
                               value={article.stock} onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AddArticle;
AddArticle.propTypes = {
    addArticle: PropTypes.func
};