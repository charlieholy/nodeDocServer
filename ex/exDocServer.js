
var express = require('express');
var app = express();
var htmldoc = require('../markdown/markdown')

var qr_code = require('qr-encode')
var qr_image = require('qr-image');


app.get('/doc/rainbow', function (req, res) {
    var _doc = htmldoc.getDoc('rainbow.md');
    _doc += "<img src='http://localhost/doc/qr_code'/>"
    res.send(_doc);
})

app.get('/doc/bitcoin-cli', function (req, res) {
    var _doc = htmldoc.getDoc('bitcoin-cli.md')
    res.send(_doc);
})

app.get('/doc/qr_code', function (req, res) {
    var temp_qrcode = qr_image.image('goodluck!');
    res.type('png');
    temp_qrcode.pipe(res);
})


var server = app.listen(80, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})