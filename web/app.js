var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dataProvider = require('./data/dataprovider');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de inicio que muestra todas las entradas
app.get('/', (req, res) => {
  const posts = dataProvider.getAllPosts();
  res.render('index', { posts });
});

// Ruta para la página de una entrada individual
app.get('/post/:id', (req, res, next) => {
  const postId = req.params.id;
  const post = dataProvider.getPostById(postId);
  if (post) {
    res.render('post', { post });
  } else {
    next(createError(404, 'Entrada no encontrada'));
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('partials/error', { message: 'Error interno del servidor' });
});

module.exports = app;

