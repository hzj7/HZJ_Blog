const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const filesRouter = require('./routes/files');

const app = express();

// express试图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//设置跨域
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");              	// 允许任意外源访问
    res.header("Access-Control-Allow-Headers", "Content-Type");		// 自定义请求首部字段
    res.header("Access-Control-Allow-Methods", "*");    		 	// 允许所有请求方法
    if (req.url !== "/api/files/uploadFile") {
        res.header("Content-Type", "application/json;charset=utf-8");	// 设置数据返回类型为json，字符集为utf8
    }
    if (req.method.toLowerCase() === 'options') {
        res.sendStatus(200); // 让 options 尝试快速结束请求
    } else {
        next();
    }
})

// 禁用缓存
app.disable('etag');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/files', filesRouter);

// 处理404错误
app.use(function (req, res, next) {
    next(createError(404));
});

// 获取错误
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
