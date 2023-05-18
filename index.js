const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const http = require('http')
const indexRouter = require('./routes/index');
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use(errorHandler);

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app;