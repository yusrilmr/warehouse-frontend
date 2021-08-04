import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
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
                    <input type="text" placeholder="Brand" name="brand"
                           value={article.identification} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Model" name="model"
                           value={article.name} onChange={handleChange}/><br/>
                    <input type="text" placeholder="Color" name="color"
                           value={article.stock} onChange={handleChange}/><br/>
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