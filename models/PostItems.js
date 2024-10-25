import mongoose from 'mongoose'

const PostIteamsSchema = new mongoose.Schema({
  student_Id:{type: String,required: true},
  points:{type:Number , required:true}
},
{
  timestamps: true,
});

const PostItem=mongoose.models.postitem || mongoose.model('postitem',PostIteamsSchema)
export default PostItem;