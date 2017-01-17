var fs = require('fs');
var log4js = require('log4js');


// 确保存在 logs 目录
var dataDir = './server/logs';
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);

var viewLogName = 'view.log';
fs.existsSync(dataDir + '/' + viewLogName) || fs.writeFileSync(dataDir + '/' + viewLogName, '');


var seoLogName = 'seo.log';
fs.existsSync(dataDir + '/' + seoLogName) || fs.writeFileSync(dataDir + '/' + seoLogName, '');

var behaviorLogName = 'behavior.log';
fs.existsSync(dataDir + '/' + behaviorLogName) || fs.writeFileSync(dataDir + '/' + behaviorLogName, '');


log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'server/logs/' + viewLogName, category: 'VIEW' },
    { type: 'file', filename: 'server/logs/' + seoLogName, category: 'SEO' },
    { type: 'file', filename: 'server/logs/' + behaviorLogName, category: 'BEHAVIOR' },
  ]
});

module.exports = log4js;