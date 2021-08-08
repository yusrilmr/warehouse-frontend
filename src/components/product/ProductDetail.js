/* eslint-disable */
import React, { useState } from 'react';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProductAPI from "../../services/productAPI";

const ProductDetail = (props) => {
    const [open, setOpen] = useState(false);
    const [productDetail, setProductDetail] = useState([]);
    const [product, setProduct] = useState({ id: '', name: '' });

    const refreshProductDetail = (productId) => {
        new ProductAPI().fetchProductDetail(productId)
            .then((responseData) => {
                setProductDetail(responseData);
            })
            .catch(err => console.error(err));
    }

    const handleClickOpen = () => {
        setProduct({
            id: props.product.productId, name: props.product.productName
        })
        refreshProductDetail(props.product.productId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        { Header: 'Article id', accessor: 'articleIdentification'},
        { Header: 'Article Name', accessor: 'articleName'},
        { Header: 'Amount', accessor: 'totalArticle'},
        { Header: 'Stock', accessor: 'stock'},
    ];
    return (
        <div>
            <Button color="primary" size="small" onClick={handleClickOpen}>Detail</Button>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
                <DialogTitle>Product Detail</DialogTitle>
                <DialogContent style={{height:'500px'}}> {/* the max height already handled by material-ui */}
                    <ReactTable data={productDetail} columns={columns} filterable={true} defaultPageSize= {10}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default ProductDetail;