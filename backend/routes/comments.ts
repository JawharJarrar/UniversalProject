export{};
const express = require('express');
const shortid = require('shortid');
const router = express.Router();
const db = require  ('../database');
const mongoose = require('mongoose');
const { CommentSchema } = require('../models/comment') ;
const Comment = mongoose.model('comment', CommentSchema);
/**
 * comments apis
 */
router.get('/', FindAllComments);
router.delete('/:id', DeleteComment);
router.post('/', AddComment);
router.put('/:id', UpdateComment);

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

module.exports = router;
