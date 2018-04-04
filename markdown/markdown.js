var markdown = require('markdown')
var fs = require('fs')
var doc = fs.readFileSync('./doc/rainbow.md','utf-8')

var htmldoc =markdown.parse(doc)
//console.log(htmldoc)
 var link1 =   ' <link href="https://cdn.bootcss.com/github-markdown-css/2.8.0/github-markdown.min.css" rel="stylesheet">'
 var link2 =   ' <link href="https://cdn.bootcss.com/highlight.js/9.12.0/styles/github-gist.min.css" rel="stylesheet">'
htmldoc = link1 + link2 + htmldoc

var getDoc = function (path) {
    var _doc = fs.readFileSync('./doc/' + path,'utf-8')
    _doc = markdown.parse(_doc)
    return _doc
}

exports.htmldoc = htmldoc


exports.getDoc = getDoc