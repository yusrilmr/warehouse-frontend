/* eslint-disable */
import React, { useState } from 'react';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SERVER_URL } from "../constants";

const ProductDetail = (props) => {
    const [open, setOpen] = useState(false);
    const [productDetail, setProductDetail] = useState([]);
    const [product, setProduct] = useState({
        id: '', name: ''
    });

    const fetchProductDetail = (productId) => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'products/' + productId + '/detail',
            {
                headers: {'Authorization': token}
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                setProductDetail(responseData);
                console.log(productDetail);
            })
            .catch(err => console.error(err));
    }

    const handleClickOpen = () => {
        setProduct({
            id: props.product.id, name: props.product.name
        })
        console.log(props.product.id);
        fetchProductDetail(props.product.id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { Header: 'Article id', accessor: 'identification'},
        { Header: 'Article Name', accessor: 'name'},
        { Header: 'Amount', accessor: 'totalArticle'},
        { Header: 'Stock', accessor: 'stock'},
    ];
    return (
        <div>
            <Button color="primary" size="small" onClick={handleClickOpen}>Detail</Button>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
                <DialogTitle>Product Detail</DialogTitle>
                <DialogContent style={{height:'500px'}}> {/* the max height already handled by material-ui */}
                    <ReactTable data={productDetail} columns={columns} filterable={true}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default ProductDetail;