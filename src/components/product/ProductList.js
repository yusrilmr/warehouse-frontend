/* eslint-disable */
import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ReactTable from "react-table";
import AddProduct from './AddProduct';
import AddProductFile from './AddProductFile';
import EditProduct from './EditProduct';
import ProductDetail from './ProductDetail';
import { SERVER_URL } from '../../services/config.js';
import MenuNav from "../MenuNav";

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productQuantities: []
        };
    }

    componentDidMount() {
        this.fetchProductQuantities();
    }

    fetchProductQuantities = () => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'product-quantities/',
            {
                headers: {'Authorization': token}
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    productQuantities: responseData,
                });
            })
            .catch(err => console.error(err));
    }

    sellProduct = (id) => {
        if (window.confirm('Are you sure to sell this product?')) {
            const token = sessionStorage.getItem("jwt");
            fetch(SERVER_URL + 'products/sell/' + id,
                {
                    method: 'DELETE',
                    headers: {'Authorization': token}
                })
                .then(res => {
                    toast.success("Product sold and inventory has been updated accordingly", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchProductQuantities();
                })
                .catch(err => {
                    toast.error("Error when deleting", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error(err)
                })
        }
    }

    deleteProduct(productId) {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'products/' + productId,
            {
                method: 'DELETE',
                headers: {'Authorization': token}
            })
            .then(res => {
                toast.success("Product deleted", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchProductQuantities();
            })
            .catch(err => {
                toast.error("Error when deleting", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                console.error(err)
            })
    }

    // Update product
    updateProduct(product, productId) {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'products/' + productId,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(product)
            })
            .then(res => {
                toast.success("Changes saved", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchProductQuantities();
            })
            .catch(err =>
                toast.error("Error when saving", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
    }

    onDeleteClick = (productId) => {
        if (window.confirm('Are you sure to delete?')) {
            this.deleteProduct(productId)
        }
    }

    render() {
        const columns = [{
            Header: 'Id',
            accessor: 'productId'
        }, {
            Header: 'Name',
            accessor: 'productName'
        }, {
            Header: 'Quantity',
            accessor: 'quantity',
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'productId',
            Cell: ({value, row}) => (
                <Button size="small" color="primary" disabled={row.quantity <= 0}
                        onClick={()=>{this.sellProduct(value)}}>
                    Sell
                </Button>
            )
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'productId',
            Cell: ({value, row}) => (
                <ProductDetail product={row} link={value} />
            )
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'productId',
            Cell: ({value, row}) => (
                <EditProduct product={row} productId={value} updateProduct={this.updateProduct}
                             fetchProductQuantities={this.fetchProductQuantities} />
            )
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'productId',
            Cell: ({value}) => (
                <Button size="small" color="secondary" onClick={()=>{this.onDeleteClick(value)}}>
                    Delete
                </Button>
            )
        }]
        return (
            <div className="App">
                <Grid container>
                    <Grid item>
                        <MenuNav />
                    </Grid>
                    <Grid item>
                        <AddProduct fetchProductQuantities={this.fetchProductQuantities} />
                    </Grid>
                    <Grid item>
                        <AddProductFile fetchProductQuantities={this.fetchProductQuantities} />
                    </Grid>
                </Grid>
                <ReactTable data={this.state.productQuantities} columns={columns} filterable={true} defaultPageSize= {10}/>
                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}
export default ProductList;