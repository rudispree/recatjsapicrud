import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { makeStyles, withStyles, Container, Grid, Typography, Card, CardContent, CardActions, Button, AppBar, Toolbar, IconButton } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';

// import './style.css';

// import Add from './Pages/Add';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Contacts = (props) => {
    return(
        <Grid item md={6}>
            <Card>
                <CardContent>
                    <Typography variant="h5">{props.title}</Typography>
                    <Typography variant="h5" color="textSecondary">{props.subtitle}</Typography>
                    <Typography variant="h5">{props.text}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" style={{marginLeft: 'auto', marginRight: 10}}>
                        <Link to={props.dest} onClick={props.detail} style={{textDecoration: 'none', color: '#1976d2'}}>{props.link}</Link>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            data: {
                title: 'a',
                subtitle: 'a',
                text: 'a',
                detail: false
            }
        }
    }

    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => {
            this.setState({users: data})
        })
        .catch(console.log)
    }

    render() {    
        const { classes } = this.props
        return (
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <Button style={{marginLeft: 'auto', marginRight: 10}}>
                            <Link to="/" style={{textDecoration: 'none', color: '#fff'}}>Home</Link>
                        </Button>
                        <Button style={{marginRight: 10}}>
                            <Link to="/Add" style={{textDecoration: 'none', color: '#fff'}}>Add Posts</Link>
                        </Button>
                    </Toolbar>
                </AppBar>
                <center>
                    <h1 style={{marginBottom: 50, fontSize: 48, fontWeight: 400}}>{!this.state.data.detail? 'Contact List' : 'Contact Detail'}</h1>
                </center>
                <Container fixed>
                    <Route exact path="/">
                        <Grid container spacing={5}>
                        {
                            this.state.users.map((contact) => (
                                <Contacts title={contact.name} subtitle={contact.email} text={contact.company.catchPhrase} dest="/detail" link="Read More" detail={() => {
                                    this.setState({
                                        data: {
                                            title: contact.name,
                                            subtitle: contact.email,
                                            text: contact.company.catchPhrase,
                                            detail: true
                                        }
                                    })
                                }} />
                            ))
                        }
                        </Grid>
                    </Route>
                    <Route path="/detail">
                        <Contacts title={this.state.data.title} subtitle={this.state.data.subtitle} text={this.state.data.text} dest="/" link="Back" detail={() => {
                            this.setState({data: {detail: false}})
                        }} />
                    </Route>
                    {/* <Route path="/Add" component={Add} /> */}
                </Container>
            </Router>
        )
    }
}

export default withStyles(useStyles)(App);


