var express = require('express');
var mysql = require('mysql'); 
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var members = require('./routes/members');
var appreciations = require('./routes/appreciations');
var authorized_users = require('./routes/authorized_users');
var index_t = 0;

 

var app = express();

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "webmadhuranga",
    password: "",
    database: "hr_app",
    port : 3306, //port mysql
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.connection = connection; 
    next(); 
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/members', members);
app.use('/appreciations', appreciations);
app.use('/authorized_users', authorized_users);

 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        //res.json({error:err.message});
        return res.json({error:err.message,err_msg:err});
        // res.render('error', {
        //     message: err.message,
        //     error: err
        // });
    });
}
 
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
