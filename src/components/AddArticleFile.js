import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const AddArticleFile = (props) => {
    const [open, setOpen] = useState(false);
    const [article, setArticle] = useState({ identification: '', name: '', stock: 0 });

    // static get propTypes() {
    //     return {
    //         children: PropTypes.any,
    //         onClickOut: PropTypes.func
    //     };
    // }

    // Open the modal form
    const handleClickOpen = () => {
        setArticle({ identification: '', name: '', stock: 0 })
        setOpen(true);
    };

    // Close the modal form
    const handleClose = () => {
        setOpen(false);
    };

    // const handleChange = (event) => {
    //     setArticle({...article, [event.target.name]: event.target.value});
    // }

    // Save article and close modal form
    const handleSave = () => {
        props.addArticle(article);
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
                Upload
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload Article File</DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default AddArticleFile;
AddArticleFile.propTypes = {
    addArticle: PropTypes.func
};