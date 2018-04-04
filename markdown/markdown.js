var markdown = require('markdown').markdown;
var fs = require('fs');
var doc = fs.readFileSync('./ok.md','utf-8')


var doc = markdown.toHTML(doc);

console.log(doc)