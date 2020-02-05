import React,{Component} from 'react';
import {TextField, withStyles, makeStyles, Grid, Container, Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core/';

const styles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 250,
  },
  select: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 250,
  },
}));

class add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      title:'',
      body:'',
      userid:0,
      users:[]
    };
  }

  changeHandler = (event) => {
    this.setState({[event.target.name]:event.target.value})
  }

  simpanPost = () => {

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        userId: this.state.userid
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))

  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            users: result
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
                <form className={classes.container} noValidate autoComplete="off">
                  <div>
                    <TextField
                      required
                      id="title"
                      label="Masukkan Judul"
                      name="title"
                      className={classes.textField}
                      margin="normal"
                      onChange={this.changeHandler}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      id="body"
                      label="Masukkan Isi"
                      name="body"
                      className={classes.textField}
                      margin="normal"
                      onChange={this.changeHandler}
                    />
                  </div>
                  <div>
                    <FormControl className={classes.select} style={{minWidth:120, marginBottom:10}}>
                      <InputLabel id="label">Pilih User</InputLabel>
                      <Select
                        labelId="label"
                        id="select"
                        name="userid"
                        onChange={this.changeHandler}
                      >
                        {this.state.users.map((item,i) => (
                        <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                        ))}

                      </Select>
                    </FormControl>
                  </div>
                  <Button variant="contained" color="primary" onClick={this.simpanPost}>
                    Submit
                  </Button>
                </form>
              </Grid>

            </Container>
        );
    }
}

export default withStyles(styles)(add)