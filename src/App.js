/* eslint-disable */
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Login from './components/Login';
import ArticleList from "./components/ArticleList";
import ProductList from "./components/ProductList";
import SecuredRoute from "./components/SecuredRoute";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Warehouse Software
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <SecuredRoute exact path="/article">
                        <ArticleList />
                    </SecuredRoute>
                    <SecuredRoute exact path="/product">
                        <ProductList />
                    </SecuredRoute>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
