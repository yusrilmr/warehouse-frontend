/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Box, Grid } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import ArticleAPI from "../../services/articleAPI";
import ProductAPI from "../../services/productAPI";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

const AddProduct = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState({ name: '', price: 0 });
    const [articles, setArticles] = useState([]);
    const [containArticles, setContainArticles] = useState([]);
    const [amounts, setAmounts] = useState([]);

    const [errorNameText, setErrorNameText] = useState('');
    const [errorPriceText, setErrorPriceText] = useState('');
    const [errorArticleText, setErrorArticleText] = useState('');
    const [errorAmountText, setErrorAmountText] = useState('');

    // Add new product
    const insertProduct = (product) => {
        new ProductAPI().insertProduct(product)
            .then(res => props.fetchProductQuantities())
            .catch(err => console.error(err))
    }

    const emptyErrorText = () => {
        setErrorNameText('');
        setErrorPriceText('');
        setErrorArticleText('');
        setErrorAmountText('');
    };

    const emptyArticlesAndAmounts = () => {
        setContainArticles([]);
        setAmounts([]);
    };

    const addArticleAndAmount = (article, amount) => {
        setContainArticles([...containArticles, article]);
        setAmounts([...amounts, amount]);
    };

    const deleteArticleAndAmount = (index) => {
        const arrContainArticles = [...containArticles];
        const arrAmounts = [...amounts];
        arrContainArticles.splice(index, 1);
        arrAmounts.splice(index, 1);
        setContainArticles(arrContainArticles);
        setAmounts(arrAmounts);
    };

    const handleAddArticle = () => {
        addArticleAndAmount("", 0);
    };

    const handleArticleChange = (index, e) => {
        const updatedArticles = containArticles.map((value, i) => {
            if (i === index) {
                return e.target.value;
            } else {
                return value;
            }
        });
        setContainArticles(updatedArticles);
    };

    const handleAmountChange = (index, e) => {
        const updatedAmounts = amounts.map((value, i) => {
            if (i === index) {
                return e.target.value;
            } else {
                return value;
            }
        });
        setAmounts(updatedAmounts);
    };

    // Open the modal form
    const handleClickOpen = () => {
        emptyErrorText();
        emptyArticlesAndAmounts();
        setProduct({ name: '', price: 0 });

        // Get articles to be shows on the article's Select.
        new ArticleAPI().fetchArticles()
            .then(responseData => { setArticles(responseData); })
            .catch(err => console.error(err));

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
            let entity = {
                name: product.name,
                price: product.price,
                productArticles: []
            }
            for(let i = 0; i < containArticles.length; i++) {
                entity.productArticles.push({
                    articleId: containArticles[i],
                    totalArticle: amounts[i]
                });
            }
            insertProduct(entity);
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
        if (product.price < 0) {
            setErrorPriceText("The field cannot be negative");
            valid = false;
        }
        if (product.price === "") {
            setErrorPriceText("The field cannot be empty");
            valid = false;
        }
        const isArticlesDuplicate = containArticles.some(
            (val, i) => containArticles.indexOf(val) !== i
        )
        if (isArticlesDuplicate) {
            setErrorArticleText("cannot be duplicate");
            valid = false;
        }
        if (containArticles.includes("")) {
            setErrorArticleText("cannot be empty");
            valid = false;
        }
        if (amounts.some(el => el <= 0)) {
            setErrorAmountText("Value > 0");
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
                    <TextField autoFocus required fullWidth label="Name" name="name" margin="dense"
                               value={product.name} onChange={handleChange}
                               error ={!!errorNameText.length} helperText={errorNameText} />
                    <TextField autoFocus required fullWidth label="Price" name="price" margin="dense" type="number"
                               defaultValue={0} value={product.price} onChange={handleChange}
                               error ={!!errorPriceText.length} helperText={errorPriceText} />
                    {containArticles.map((containArticle, index) => (
                        <Box key={"article" + index}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item xs={9}>
                                    <FormControl fullWidth className={classes.formControl} error={!!errorArticleText.length}>
                                        <InputLabel error={!!errorArticleText.length}>
                                            Article
                                        </InputLabel>
                                        <Select
                                            error={!!errorArticleText.length} fullWidth value={containArticle || ""}
                                            onChange={
                                                (e) => handleArticleChange(index, e)
                                            }>
                                            {
                                                articles.map((article, index) => (
                                                    <MenuItem value={article.id}>
                                                        {article.identification + ' - ' + article.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText>{errorArticleText}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField fullWidth label="Amount" name="amount" type="number" defaultValue={0}
                                        error ={!!errorAmountText.length} helperText={errorAmountText}
                                        onChange={
                                            (e) => handleAmountChange(index, e)
                                        } />
                                </Grid>
                                <Grid item xs={1}>
                                    <div
                                        className="font-icon-wrapper"
                                        onClick={() => deleteArticleAndAmount(index)}>
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                    <Button fullWidth onClick={handleAddArticle} color="primary">
                        Add Article
                    </Button>
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