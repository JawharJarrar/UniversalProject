import * as express from 'express';
import * as shortid  from 'shortid';
import db from '../database';
import * as mongoose from 'mongoose';
import { AuthSchema } from '../models/auth';

const Router = express.Router();
const Auth = mongoose.model('auth', AuthSchema);
/**
 * authentification apis
 */
Router.post('/register', Register);
Router.post('/login', Login);
/**
 * functions used by the authentification apis
 */
function Register(req, res, next) {
  const auth = req.body;
  auth.id = shortid.generate();
  db.query('INSERT INTO auth values (?,?,?,?)', [
    auth.id ,
    auth.username,
    auth.email,
    auth.password]
    , (error, rows, fields) => {
      if (error) {
        res.json({ 'mysql register error ': error });
      }
  });
  Auth.create(auth, function (error, post) {
    if (error) {
      res.json({ 'mongo register error ': error });
    }
  });
  res.json({'SUCCESS': auth});
}

function Login(req, res, next) {
const auth = req.body;
  Auth.findOne({email: auth.email, password: auth.password }, function (error, user) {
    if (error) {
      res.json({ 'login error ': error });
    }
    res.send( user);
  });
}
export default Router;
