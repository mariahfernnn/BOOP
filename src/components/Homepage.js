import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Image from 'material-ui-image';
import '../index.css'
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '70%',
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    fontWeight: 'bold',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: '8px 0 8px 8px'
  },
  input: {
    display: 'none',
  },
  formStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  login: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  header: {
    fontFamily: 'Lobster'
  }
}));

// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//   },
// });

export default function Homepage (props) {
  const classes = useStyles();
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showLogin, setShowLogin] = useState(false)

  const onSubmit = function (evt) {
    evt.preventDefault();
    //validations here
    userLogin();
  }
  const handleEmailChange = function(e) {
    setEmail(e.target.value)
  }
  const handlePasswordChange = function(e) {
    setPassword(e.target.value)
  }

  //make a call to the server if theres a session id (stretch)
  // useEffect(()=> {
  // }, [])

 let userLogin = function () {
   axios.post(`/login`, {email, password}, { withCredentials: true})
   .then(res => {
      props.onLogin(res.data.userId)
   })
 }

  return (
  <div>
    {showLogin ? 
    <div className="header">
      <h1>Login</h1>
      <form className={ classes.formStyle } onSubmit={onSubmit}>
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          margin="normal"
          onChange={handleEmailChange}
          value={email}
        />
        <TextField
          id="standard-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" 
          color="primary" 
          className={classes.button} type="submit" >
            Log In
        </Button>
      </form>
        {/* <a href="http://localhost:3001/auth/facebook">Log In with Facebook</a> */}
        {/* <div class="fb-login-button" data-width="" data-size="medium" data-button-type="login_with" data-auto-logout-link="true" data-use-continue-as="true"></div> */}
    </div>
      : 
      <Container maxWidth="xl">
        <div className={classes.login}>
          <h2 className={classes.header}>Puppr</h2>
        <Button variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={() => setShowLogin(true)}>
          Log In
        </Button>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1521247560470-d2cbfe2f7b47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        />
    </Container>
    }
  </div>
  );
}