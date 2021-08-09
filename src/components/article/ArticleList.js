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
import MenuNav from '../MenuNav';
import ArticleAPI from "../../services/articleAPI";

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = { articles: [] };
    }

    componentDidMount() {
        this.refreshArticles();
    }

    refreshArticles = () => {
        new ArticleAPI().fetchArticles()
            .then(responseData => { this.setState({ articles: responseData }); })
            .catch(err => console.error(err));
    }

    deleteArticle = (articleId) => {
        if (window.confirm('Are you sure to delete?')) {
            new ArticleAPI().deleteArticle(articleId)
                .then(res => {
                    toast.success("Article deleted", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.refreshArticles();
                })
                .catch(err => {
                    toast.error("Error when deleting", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                })
        }
    }

    addArticle = (article) => {
        new ArticleAPI().insertArticle(article).then(res => {
            toast.success("New article saved", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.refreshArticles();
        });
    }

    updateArticle = (article, id) => {
        new ArticleAPI().updateArticle(id, article)
            .then(res => {
                toast.success("Changes saved", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.refreshArticles();
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
                <EditArticle article={row} link={value} updateArticle={this.updateArticle} />
            )
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({value}) => (
                <Button size="small" color="secondary" onClick={()=>{this.deleteArticle(value)}}>
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
                        <AddArticle addArticle={this.addArticle} />
                    </Grid>
                    <Grid item>
                        <AddArticleFile refreshArticles={this.refreshArticles} />
                    </Grid>
                </Grid>
                <ReactTable data={this.state.articles} columns={columns} filterable={true} defaultPageSize= {10}/>
                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}
export default ArticleList;