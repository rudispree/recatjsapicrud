import React, { Component } from 'react';
import {Typography,Container, Paper, withStyles, Grid, Button } from '@material-ui/core/';
import {Link} from 'react-router-dom';

const styles = theme => ({
  boxitem:{
    background:'#61DAFB',
    padding:10
  }, 
  linkMore:{
    textAlign:'right'
  }
});

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  // deletePost = (id) => {
  //   console.log(id)
  //   fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  //     method: 'DELETE'
  //   })
  //   .then(response => response.json())
  //   .then(json => console.log(json))
  // }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result
          });
        },
        (error) => {
          console.log(error)
        }
      )
  }

    render() {
      const {classes} = this.props;
        return (
            <Container fixed>
              <Grid container spacing={3}>
                {this.state.items.map(item => (
                  <Grid item xs={6}>

                    <Paper key={item.id} className={classes.boxitem}>

                      <Typography variant="h5" component="h3">
                        {item.name}
                      </Typography>
                      <Typography component="p">
                        Email Address : {item.email}
                      </Typography>

                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Typography component="p">
                            No.telp : {item.phone}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.linkMore}>
                          <Button variant="contained">
                              <Link to={{
                                  pathname: '/detail',
                                  id: `${item.id}`,
                                }}>
                                Read More
                              </Link>
                          </Button>
                          <Button variant="contained">
                            <Link to={{
                                pathname: '/editPost',
                                id: `${item.id}`,
                              }}>
                              Edit
                            </Link>
                          </Button>
                          <Button variant="contained" onClick={()=>this.deletePost(item.id)}>
                              Hapus
                          </Button>
                        </Grid>
                      </Grid>

                    </Paper>
                    
                  </Grid>
                ))}
              </Grid>

            </Container>
        );
    }
}

export default withStyles(styles)(home)