/* eslint-disable */
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Login from './components/Login';

function App() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Warehouse Software
            </Typography>
          </Toolbar>
        </AppBar>
        <Login />
      </div>
  );
}

export default App;
