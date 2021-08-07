/* eslint-disable */
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';

import React, { Component } from 'react';
import ReactTable from "react-table";
import { ToastContainer, toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddArticle from './AddArticle';
import AddArticleFile from './AddArticleFile';
import EditArticle from './EditArticle';
import MenuNav from './MenuNav';
import { SERVER_URL } from '../constants.js';

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = { articles: [] };
    }

    componentDidMount() {
        this.fetchArticles();
    }

    fetchArticles = () => {
        const token = sessionStorage.getItem("jwt");
        console.log(token)
        // const token = localStorage.getItem("token");
        // console.log(token);
        console.log(SERVER_URL + 'articles/');
        fetch(SERVER_URL + 'articles/',
            {
                headers: {'Authorization': token}
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    articles: responseData,
                });
            })
            .catch(err => console.error(err));
    }

    // Delete article
    onDelClick = (id) => {
        if (window.confirm('Are you sure to delete?')) {
            const token = sessionStorage.getItem("jwt");
            fetch(SERVER_URL + 'articles/' + id,
                {
                    method: 'DELETE',
                    headers: {'Authorization': token}
                })
                .then(res => {
                    toast.success("Article deleted", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchArticles();
                })
                .catch(err => {
                    toast.error("Error when deleting", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error(err)
                })
        }
    }

    // Add new article
    addArticle(article) {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'articles',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(article)
            })
            .then(res => this.fetchArticles())
            .catch(err => console.error(err))
    }

    // Update article
    updateArticle(article, id) {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'articles/' + id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(article)
            })
            .then(res => {
                toast.success("Changes saved", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchArticles();
            })
            .catch(err =>
                toast.error("Error when saving", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
    }

    render() {
        const columns = [{
            Header: 'Identification',
            accessor: 'identification'
        }, {
            Header: 'Name',
            accessor: 'name',
        }, {
            Header: 'Stock',
            accessor: 'stock',
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({value, row}) => (
                <EditArticle article={row} link={value} updateArticle={this.updateArticle}
                             fetchArticles={this.fetchArticles} />
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
                        <MenuNav />
                    </Grid>
                    <Grid item>
                        <AddArticle addArticle={this.addArticle} fetchArticles={this.fetchArticles} />
                    </Grid>
                    <Grid item>
                        <AddArticleFile addArticle={this.addArticle} fetchArticles={this.fetchArticles} />
                    </Grid>
                </Grid>
                <ReactTable data={this.state.articles} columns={columns} filterable={true} defaultPageSize= {10}/>
                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}
export default ArticleList;