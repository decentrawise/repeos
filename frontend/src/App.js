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
          <Route exact path='/' component={Home} />
          <Route path='/payment' component={Payment} />
          <Route path='/rate' component={Rate} />
          <Route path='/result' component={Result} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
