import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import {SERVER_URL} from "../constants";
const ProductDetail = (props) => {
    const [open, setOpen] = useState(false);
    const [articles, setArticles] = useState([]);
    const [productArticles, setProductArticles] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [product, setProduct] = useState({
        id: '', name: ''
    });

    const fetchProductArticles = (productId) => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'productArticles/search/findByProductId?productId=' + productId,
            {
                headers: {'Authorization': token}
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                setProductArticles(responseData)
            })
            .then((responseData) => {
                console.log(responseData);
            })
            .catch(err => console.error(err));
    }

    const fetchArticles = (articleIds) => {
        const token = sessionStorage.getItem("jwt");

    }

    const handleClickOpen = () => {
        // console.log(props.product);
        setProduct({
            id: props.product.id, name: props.product.name
        })
        fetchProductArticles(props.product.id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { Header: 'Article id', accessor: 'id'},
        { Header: 'Article Name', accessor: 'articleName'},
        { Header: 'Amount', accessor: 'amount'},
        { Header: 'Stock', accessor: 'stock'},
    ];

    const rows = [
        { id: "1", articleName: 'table leg', amount: 4, stock: 20 },
        { id: "2", articleName: 'table toptable toptable toptable toptable toptable toptable top', amount: 1, stock: 10 },
        { id: "3", articleName: 'screw', amount: 4, stock: 50 },
        { id: "4", articleName: 'table paint', amount: 1, stock: 10 },
    ];
    return (
        <div>
            <Button color="primary" size="small" onClick={handleClickOpen}>Detail</Button>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
                <DialogTitle>Product Detail</DialogTitle>
                <DialogContent style={{height:'500px'}}> {/* the max height already handled by material-ui */}
                    <ReactTable data={rows} columns={columns} filterable={true}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default ProductDetail;