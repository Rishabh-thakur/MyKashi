import React,{useState,useRef} from 'react';
import { Typography,TextField,Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './style';
import { commentPost } from '../../actions/posts';

const CommentSection = ({post}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comments,setComments] = useState(post?.comments);
  const [comment,setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));
  const commentRef = useRef();

  const handleClick = async () => {
 const finalComment = `${user.result.name}: ${comment}`;
  const newComment = await dispatch(commentPost(finalComment,post._id));
   setComments(newComment);
   setComment('');  
   commentRef.current.scrollIntoView({ behavior : 'smooth' });
 
};

  return (
   <div>
       <div className= { classes.commentsOuterContainer} >
           <div className= { classes.commentsInnerContainer }>
            <Typography gutterBottom variant="h6">Comments</Typography>
          {comments.map((comment,index)=>(
              <Typography key={index} gutterBottom variant='subtitle1'>
                  <strong>{comment.split(':')[0]}</strong>
                 <i>{comment.split(":")[1]}</i>
              </Typography>
          ))}
          <div ref={commentRef}/>
           </div>
         {/* Comment box */}
         {user?.result?.name && (
         <div style={{width : '70%'}}>
         <Typography gutterBottom variant="h6">Write a Comment</Typography>
         <TextField
         fullWidth
         rows = {4}
         variant = 'outlined'
         label = 'Comment'
         multiline
         value={comment}
         onChange = {(e) => setComment(e.target.value)}
         />
         <Button style={{marginTop : '10px'}} color = "primary" fullWidth disabled = {!comment} variant = "contained" onClick={handleClick} >
             Comment
         </Button>
          </div>
          )}
          
       </div>
   </div>
  )
}

export default CommentSection;