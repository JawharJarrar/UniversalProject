import * as express from 'express';
import * as shortid  from 'shortid';
import db from '../database';
import * as mongoose from 'mongoose';
import { CommentSchema } from '../models/comment';

const Router = express.Router();
const Comment = mongoose.model('comment', CommentSchema);
/**
 * comments apis
 */
Router.get('/', FindAllComments);
Router.delete('/:id', DeleteComment);
Router.post('/', AddComment);
Router.put('/:id', UpdateComment);

/**
 * functions used by the comments apis
 */
function  DeleteComment(req, res, next)   {
  db.query('Delete from  comments  where id=?', [req.params.id], (error, rows, fields) => {
    if (error) {
      res.json({ 'mysql delete error ': error });
    }
  });
  Comment.findOneAndRemove({id: req.params.id}, function (error) {
    if (error) {
      res.json({ 'mongo delete error ': error });
    }
  });
res.json({'REMOVED': req.params.id});
}

function UpdateComment(req, res, next) {
  const comment = req.body;
  db.query('UPDATE comments  SET name=?,email=?, body=? WHERE id=? ', [
    comment.name,
    comment.email,
    comment.body,
    req.params.id
  ], (error, rows, fields) => {
    if (error) {
      throw error;
    }
  });
  Comment.findOneAndUpdate({id: req.params.id}, comment, function (error) {
    if (error) {
       res.json({ 'mongo update error ': error });
    }
  });
  res.json({'UPDATED': comment});
}

function AddComment(req, res, next) {
  const comment = req.body;
  comment.id = shortid.generate();
  db.query('INSERT INTO comments values (?,?,?,?,?)', [
    comment.id ,
    comment.postId,
    comment.name,
    comment.email,
    comment.body], (error, rows, fields) => {
      if (error) {
        res.json({ 'mysql create error ': error });
     }
  });
  Comment.create(comment, function (error) {
    if (error) {
      res.json({ 'mongo create error ': error });
   }
  });
  res.json({'SUCCESS': comment});
}

 function FindAllComments(req, res, next) {
  db.query('select * from  comments', (error, rows, fields) => {
    if (error) {
      res.json({ 'mysql fetch error ': error });
   }
    res.json(rows);
  });
}

export default Router;
