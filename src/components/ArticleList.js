import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js';
import ReactTable from "react-table";
import { CSVLink } from 'react-csv';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddArticle from './AddArticle';
import EditArticle from './EditArticle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = { articles: [] };
    }

    componentDidMount() {
        this.fetchArticles();
    }

    fetchArticles = () => {
        // Read the token from the session storage
        // and include it to Authorization header
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/articles',
            {
                headers: {'Authorization': token}
            })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    articles: responseData._embedded.articles,
                });
            })
            .catch(err => console.error(err));
    }

    // Delete article
    onDelClick = (link) => {
        if (window.confirm('Are you sure to delete?')) {
            const token = sessionStorage.getItem("jwt");
            fetch(link,
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
        fetch(SERVER_URL + 'api/articles',
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
    updateArticle(article, link) {
        const token = sessionStorage.getItem("jwt");
        fetch(link,
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
            accessor: '_links.self.href',
            Cell: ({value, row}) => (<EditArticle article={row} link={value} updateArticle={this.updateArticle}
                                              fetchArticles={this.fetchArticles} />)
        }, {
            id: 'delbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value}) => (<Button size="small" color="secondary" onClick={()=>{this.onDelClick(value)}}>
                Delete
            </Button>)
        }]
        return (
            <div className="App">
                <Grid container>
                    <Grid item>
                        <AddArticle addArticle={this.addArticle} fetchArticles={this.fetchArticles} />
                    </Grid>
                    <Grid item style={{padding: 15}}>
                        <CSVLink data={this.state.articles} separator=",">Export CSV</CSVLink>
                    </Grid>
                </Grid>
                <ReactTable data={this.state.articles} columns={columns} filterable={true}/>
                <ToastContainer autoClose={1500} />
            </div>
        );
    }
}
export default ArticleList;