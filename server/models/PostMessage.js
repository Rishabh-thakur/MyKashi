import mongooose from 'mongoose';

const postSchema = mongooose.Schema({
    title:String,
    message:String,
    name : String,
    creator:String,
    tags:[String],
    selectedFile :String,
    likes:{
        type:[String],
        default:[]
    },
    comments:{
        type : [String],
        default :[]
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
})

const PostMessage = mongooose.model('PostMessage',postSchema);
export default PostMessage;