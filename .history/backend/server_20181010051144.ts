require ('zone.js/dist/zone-node');
require ('reflect-metadata');
const { enableProdMode } = require ('@angular/core');
const express = require('express');
const { join } = require ('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
/**
 * routes defenition
 */
const  usersRouter = require('./routes/users');
const  postsRouter = require('./routes/posts');
const  commentsRouter = require('./routes/comments');
const  authRouter = require('./routes/auth');
/**
 * mongo db connection
 */

mongoose.connect( 'mongodb://localhost:27017/demo', { promiseLibrary: require('bluebird'), })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

/** Faster server renders w/ Prod mode (dev mode never needed)*/
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 3000;
const DIST_FOLDER = join(process.cwd(), 'dist');

/**leave this as require() since this file is built Dynamically from webpack*/
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main');

/** Express Engine */
import { ngExpressEngine } from '@nguniversal/express-engine';
/** Import module map for lazy loading */
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/auth', authRouter);

/** Server static files from /browser */
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

/** Start up the Node server */
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
export default app;
