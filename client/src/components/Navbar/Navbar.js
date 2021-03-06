import React ,{ useState,useEffect } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { AppBar,Avatar,Toolbar,Button,Typography } from '@material-ui/core'
import usestyles from './style';
import memories from '../../images/memories.png';
import { useDispatch } from 'react-redux';
import * as actionType from '../../constants/actionType';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = usestyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useNavigate();
   const location = useLocation();

    const logout = () => {
        dispatch({ type : actionType.LOGOUT});
        history('/');
        setUser(null);
    };

    useEffect(() => {
      const token = user?.token;

      if(token){
       const decodeToken = decode(token);

       if(decodeToken.exp*1000 < new Date().getTime())
       logout();
      }

      setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])
    

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
    <div className={classes.brandContainer}>
    <Typography component={Link} to ='/' className={classes.heading} height='1.2' variant='h2' align='center' >
      MyKashi
    </Typography>
    <img className={classes.image} src={memories} alt="memories" height="60"/>
    </div>
    <Toolbar className={classes.toolbar}>
     {user ?.result ? (
         <div className={classes.profile}>
             <Avatar className={classes.purple} alt = {user?.result.name} src = {user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
             <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
             <Button variant = "contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
         </div>
     ) : (
        <Button component = {Link} to="/auth" variant="contained" color="primary">Sign In</Button>
      )

     }
    </Toolbar>
  </AppBar>
  );
};

export default Navbar