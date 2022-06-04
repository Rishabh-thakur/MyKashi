import React,{useState,useEffect} from 'react'
import {Container,Grow,Grid,Paper,AppBar,TextField,Button} from '@material-ui/core';
import { useNavigate,useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ChipInput from 'material-ui-chip-input';

import {getPosts,getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './style';

function useQuery(){
   return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId,setCurrentId] = useState(0);
  const dispatch = useDispatch();
 const classes = useStyles();
const navigate = useNavigate();
const query = useQuery();
const page = query.get('page') || 1;
const searchQuery = query.get('searchQuery');

const [search,setSearch] = useState("");
const [tags,setTags] = useState([]);


const handlekeyPress = (e)=>{
if(e.keyCode === 13){
  //search for post
  searchPost();
}
}

  const searchPost = () => {
    if(search.trim() || tags){
      dispatch(getPostsBySearch({search,tags:tags.join(',')}));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }
    else{
      navigate('/');
    }
  }

  const handleDelete = (tagDelete) => setTags(tags.filter((tag) => tag !== tagDelete));

  const handleAdd = (tag) => setTags([...tags,tag]);

  return (
    <Grow in>
       <Container maxWidth= "xl">
         <Grid container justify="space-between" className={classes.gridContainer} alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm = {6} md={9}>
             <Posts setCurrentId = {setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm = {6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color='inherit' >
                <TextField name='search' variant='outlined'
                 label='Search Memories'
                 onKeyPress={handlekeyPress}
                value={search}
                fullWidth
                onChange = {(e)=> {setSearch(e.target.value)}} 
                />
              
              <ChipInput
               style={{margin : '10px 0'}}
               value ={tags}
               onAdd = {item => handleAdd(item)}
               onDelete = {item => handleDelete(item)}
               label = "Search Tags"
               variant='outlined'
              />
              
              <Button onClick = {searchPost} className = {classes.searchButton} variant='contained' color="primary">Search</Button>

               </AppBar>
              <Form currentId={currentId} setCurrentId = {setCurrentId} />
               {(!searchQuery && !tags.length) && (
                 <Paper elevation={6} className = {classes.pagination}>
                 <Pagination page = {page} />
                </Paper>
               )}   
            </Grid>
         </Grid>
       </Container>
      </Grow>
  )
}

export default Home