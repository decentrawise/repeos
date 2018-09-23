import React, { Component } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';

// material-ui dependencies
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Pages
import Home from './pages/home';
import Payment from './pages/payment';
import Rate from './pages/rate';
import Result from './pages/result';


// App base component
export default class App extends Component {

  constructor(props) {
    super(props);

    this.txID = Math.floor(Math.random() * 1000000000); // TODO: Create this in some adequate maner
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              AliBay - Your Online Shop
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path='/' render={(props) => <Home {...props} tx={this.txID} />} />
          <Route path='/payment' render={(props) => <Payment {...props} tx={this.txID} />} />
          <Route path='/rate' render={(props) => <Rate {...props} tx={this.txID} />} />
          <Route path='/result' render={(props) => <Result {...props} tx={this.txID} />} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
