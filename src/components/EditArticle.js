import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
const EditArticle = (props) => {
    const [open, setOpen] = useState(false);
    const [article, setArticle] = useState({
        identification: '', name: '', stock: 0
    });
    const handleClickOpen = () => {
        setArticle({
            identification: props.article.identification, name: props.article.name, stock: props.article.stock
        })
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setArticle({...article, [event.target.name]: event.target.value});
    }
    // Update article and close modal form
    const handleSave = () => {
        props.updateArticle(article, props.link);
        handleClose();
    }
    return (
        <div>
            <Button color="primary" size="small" onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Article</DialogTitle>
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
export default EditArticle;