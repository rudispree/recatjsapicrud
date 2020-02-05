import React, { Component } from 'react';
import {Typography,Container, Paper, withStyles, Grid } from '@material-ui/core/';

const styles = theme => ({
  boxitem:{
    background:'#61DAFB',
    padding:10
  },
  linkMore:{
    textAlign:'right'
  }
});

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      id:this.props.location.id,
    };
  }

  componentDidMount() {
    fetch(`https://jsonplaceholder.typicode.com/users/${this.state.id}`)
      .then(res => res.json())
      .then(
        (result) => {
          
          this.setState({
            items: result,
            address: result.address
          });
        },                
        (error) => {
          console.log(error)   
        }
      )
  }

    render() {
      const {classes} = this.props;
      const item = this.state.items
        return (
            <Container fixed>
              <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Paper key={item.id} className={classes.boxitem}>

                      <Typography variant="h5" component="h3">
                        {item.name}
                      </Typography>
                      <Typography component="p">
                        Email Address : {item.email}
                      </Typography>
                      <Typography component="p">
                        No.telp : {item.phone}
                      </Typography>
                    </Paper>
                  </Grid>
              </Grid>

            </Container>
        );
    }
}

export default withStyles(styles)(Detail)