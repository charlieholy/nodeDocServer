var markdown = require('markdown')
var fs = require('fs')
var doc = fs.readFileSync('./rainbow.md','utf-8')

var htmldoc =markdown.parse(doc)
console.log(htmldoc)