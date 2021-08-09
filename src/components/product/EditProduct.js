/* eslint-disable */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import ArticleAPI from "../../services/articleAPI";
import {Box, Grid} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ProductAPI from "../../services/productAPI";
import {toast} from "react-toastify";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

const EditProduct = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState({ name: '', price: 0 });
    const [articles, setArticles] = useState([]);

    const [productArticleIds, setProductArticleIds] = useState([]);
    const [containArticles, setContainArticles] = useState([]);
    const [amounts, setAmounts] = useState([]);

    const [errorNameText, setErrorNameText] = useState('');
    const [errorPriceText, setErrorPriceText] = useState('');
    const [errorArticleText, setErrorArticleText] = useState('');
    const [errorAmountText, setErrorAmountText] = useState('');

    const getProductDetail = () => {
        new ProductAPI().fetchProductDetail(props.productId)
            .then((responseData) => {
                const arrContainArticles = []
                const arrAmounts = []
                const arrProductArticleIds = []
                for(let i = 0; i < responseData.length; i++) {
                    arrProductArticleIds.push(responseData[i].productArticleId);
                    arrContainArticles.push(responseData[i].articleId);
                    arrAmounts.push(responseData[i].totalArticle);
                }
                setProductArticleIds(arrProductArticleIds);
                setContainArticles(arrContainArticles);
                setAmounts(arrAmounts);

            })
            .catch(err => console.error(err));
    };

    const emptyErrorText = () => {
        setErrorNameText('');
        setErrorPriceText('');
        setErrorArticleText('');
        setErrorAmountText('');
    };

    const addProductArticleAttribute = (productArticleId, article, amount) => {
        setContainArticles([...containArticles, article]);
        setAmounts([...amounts, amount]);
        setProductArticleIds([...productArticleIds, productArticleId]);
    };

    const deleteProductArticleAttribute = (index) => {
        if (window.confirm('Are you sure to remove this article from the product?')) {
            if (productArticleIds[index]) {
                deleteProductArticle(index);
            }
            else {
                deleteProductArticleUI(index);
            }
        }
    };

    const deleteProductArticle = (index) => {
        const productArticleId = productArticleIds[index];
        new ProductAPI().deleteProductArticle(productArticleId)
            .then(res => {
                deleteProductArticleUI(index);
                toast.success("article is removed from the product", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            })
            .catch(err => {
                toast.error("Error when deleting", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
            })
    };

    const deleteProductArticleUI = (index) => {
        const arrContainArticles = [...containArticles];
        const arrAmounts = [...amounts];
        const arrProductArticleIds = [...productArticleIds];

        arrContainArticles.splice(index, 1);
        arrAmounts.splice(index, 1);
        arrProductArticleIds.splice(index, 1);

        setContainArticles(arrContainArticles);
        setAmounts(arrAmounts);
        setProductArticleIds(arrProductArticleIds);
    }

    const handleAddArticle = () => {
        addProductArticleAttribute(null, "", 0);
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

    const handleClickOpen = () => {
        emptyErrorText();
        setProduct({
            name: props.product.productName,
            price: props.product.productPrice
        })

        // Get articles to be shown on the article's Select.
        new ArticleAPI().fetchArticles()
            .then(responseData => {
                setArticles(responseData);
                getProductDetail();
            })
            .catch(err => console.error(err));

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
            let entity = {
                id: props.productId,
                name: product.name,
                price: product.price,
                productArticles: []
            }
            for(let i = 0; i < containArticles.length; i++) {
                entity.productArticles.push({
                    id: productArticleIds[i],
                    articleId: containArticles[i],
                    totalArticle: amounts[i]
                });
            }
            props.updateProduct(entity, props.productId);
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
            <Button color="primary" size="small" onClick={handleClickOpen}>Edit</Button>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required fullWidth label="Name" name="name"
                               value={product.name} onChange={handleChange}
                               error ={!!errorNameText.length} helperText={errorNameText}/>
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
                                        value={amounts[index]} error ={!!errorAmountText.length} helperText={errorAmountText}
                                        onChange={
                                            (e) => handleAmountChange(index, e)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <div
                                        className="font-icon-wrapper"
                                        onClick={() => deleteProductArticleAttribute(index)}>
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
export default EditProduct;