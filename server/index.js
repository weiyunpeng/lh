//启动入口�
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var routes = require('./server/router.js');
var app = express();
// all environments
app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '2mb',extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
// 配置服务允许全站跨域请求
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", 'vastliu')
    // res.header("Content-Type", "application/json;charset=utf-8");
    // 为便于观察测试，模拟后端接口会有600s的延时返回
    setTimeout(function(){
    	next();
    }, 600);
    
});
//路由
routes(app)
http.createServer(app).listen(app.get('port'), function () {
    console.log('Stub接口已启动，端口： ' + app.get('port'));
});


