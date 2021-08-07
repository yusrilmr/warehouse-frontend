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
    // const [errorText, setErrorText] = useState({ identification: '', name: '', stock: '' });
    const [errorIdentificationText, setErrorIdentificationText] = useState('');
    const [errorNameText, setErrorNameText] = useState('');
    const [errorStockText, setErrorStockText] = useState('');

    const [article, setArticle] = useState({ identification: '', name: '', stock: 0 });

    const emptyErrorText = () => {
        // setErrorText({ identification: '', name: '', stock: '' })
        setErrorIdentificationText('');
        setErrorNameText('');
        setErrorStockText('');
    };

    // Open the modal form
    const handleClickOpen = () => {
        emptyErrorText();
        setArticle({ identification: '', name: '', stock: 0 })
        setOpen(true);
    };

    // Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setArticle({...article, [event.target.name]: event.target.value});
    };

    // Save article and close modal form
    const handleSave = () => {
        if (isValid()) {
            props.addArticle(article);
            handleClose();
        }
    };

    const isValid = () => {
        emptyErrorText();
        let valid = true;
        if (article.identification === '') {
            // setErrorText({...errorText, identification: "This field is mandatory"});
            setErrorIdentificationText("This field is mandatory");
            valid = false;
        }
        if (article.name === '') {
            // setErrorText({...errorText, name: "This field is mandatory"});
            setErrorNameText("This field is mandatory")
            valid = false;
        }
        if (article.stock < 0) {
            // setErrorText({...errorText, stock: "This field cannot be less than 0"});
            setErrorStockText("This field cannot be less than 0")
            valid = false;
        }
        return valid;
    };

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
                New Article
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Article</DialogTitle>
                <DialogContent>
                    <TextField autoFocus fullWidth label="Identification" name="identification"
                               value={article.identification} onChange={handleChange}
                               error ={!!errorIdentificationText.length} helperText={errorIdentificationText}/>
                    <TextField fullWidth label="Name" name="name"
                               value={article.name} onChange={handleChange}
                               error ={!!errorNameText.length} helperText={errorNameText}/>
                    <TextField fullWidth label="Stock" name="stock" type="number"
                               value={article.stock} onChange={handleChange}
                               error ={!!errorStockText.length} helperText={errorStockText}/>
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