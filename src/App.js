import React, { Component } from 'react';
import {Typography, withStyles, Box, AppBar, Toolbar} from '@material-ui/core/';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import Home from './components/home'
import Detail from './components/detail'
import AddPost from './components/add'
import EditPost from './components/edit'

const styles = theme => ({
  title:{
    background: 'black',
    color:'white',
  },
  menu:{
    marginRight:20,
    color:'white'
  }
});

class App extends Component {
  render() {
    const {classes} = this.props;
      return (
        <Router>
          <React.Fragment>

            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">
                  <NavLink className={classes.menu}  to="/">User</NavLink>
                </Typography>
                <Typography variant="h6">
                  <NavLink className={classes.menu} to="/addPost">Add Posts</NavLink>
                </Typography>
              </Toolbar>
            </AppBar>

            <Box component="div" className={classes.title}>
              <Typography variant="h4" component="h3" align="center">
                Daftar User
              </Typography>
              <hr/>
            </Box>

            <Route path="/" exact component={Home}/>
            <Route path="/detail" component={Detail}/>
            <Route path="/addPost" component={AddPost}/>
            <Route path="/editPost" component={EditPost}/>

          </React.Fragment>
        </Router>
      )
  }
}

export default withStyles(styles)(App)