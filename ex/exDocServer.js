
var express = require('express');
var app = express();
var htmldoc = require('../markdown/markdown')
app.get('/doc/rainbow', function (req, res) {
    res.send(htmldoc.htmldoc);
})

var server = app.listen(80, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})