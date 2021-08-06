import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ReactTable from "react-table";
import AddProduct from './AddProduct';
import AddProductFile from './AddProductFile';
import EditProduct from './EditProduct';
import ProductDetail from './ProductDetail';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productDetail: {}
        };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'products',
            {
                headers: {'Authorization': token}
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    products: responseData,
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
                    toast.success("Product deleted", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchProducts();
                })
                .catch(err => {
                    toast.error("Error when deleting", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error(err)
                })
        }
    }

    // Delete product
    onDelClick = (id) => {
        if (window.confirm('Are you sure to delete?')) {
            const token = sessionStorage.getItem("jwt");
            fetch(SERVER_URL + 'products/' + id,
                {
                    method: 'DELETE',
                    headers: {'Authorization': token}
                })
                .then(res => {
                    toast.success("Product deleted", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchProducts();
                })
                .catch(err => {
                    toast.error("Error when deleting", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error(err)
                })
        }
    }

    // Add new product
    addProduct(product) {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'products',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(product)
            })
            .then(res => this.fetchProducts())
            .catch(err => console.error(err))
    }

    // Update product
    updateProduct(product, id) {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'products/' + id,
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
                this.fetchProducts();
            })
            .catch(err =>
                toast.error("Error when saving", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
    }

    render() {
        const columns = [{
            Header: 'Id',
            accessor: 'id'
        }, {
            Header: 'Name',
            accessor: 'name'
        }, {
            Header: 'Availability',
            accessor: 'availability',
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({value, row}) => (
                <Button size="small" color="primary" onClick={()=>{this.sellProduct(value)}}>
                    Sell
                </Button>
            )
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({value, row}) => (
                <ProductDetail product={row} link={value} fetchProductDetail={this.fetchProductDetail}/>
            )
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({value, row}) => (
                <EditProduct product={row} link={value} updateProduct={this.updateProduct}
                             fetchProducts={this.fetchProducts} />
            )
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({value}) => (
                <Button size="small" color="secondary" onClick={()=>{this.onDelClick(value)}}>
                    Delete
                </Button>
            )
        }]
        return (
            <div className="App">
                <Grid container>
                    <Grid item>
                        <AddProduct addProduct={this.addProduct} fetchProducts={this.fetchProducts} />
                    </Grid>
                    <Grid item>
                        <AddProductFile addProduct={this.addProduct} fetchProducts={this.fetchProducts} />
                    </Grid>
                </Grid>
                <ReactTable data={this.state.products} columns={columns} filterable={true}/>
                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}
export default ProductList;