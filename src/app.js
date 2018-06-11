const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const conf = require('./config/defaultConfig.js');

const server = http.createServer((req,res) => {
  const filePath = path.join(conf.root,req.url);
  fs.stat(filePath,(err,stats) => {
    if(err){
      res.statusCode = 404;
      res.setHeader('Content-Type','text/plain');
      res.end(`${filePath} is not a directory or file`)
      return;
    }
    stats
  })
  res.statusCode = 200;
  res.setHeader('Content-Type','text/plain');
  res.end(filePath)

})

server.listen(conf.port,conf.hostname,() => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.info(`Server started at ${chalk.green(addr)}`);
})
