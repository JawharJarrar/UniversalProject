import * as mongoose from 'mongoose';
export const CommentSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  body: String,
  postId: String,
});
