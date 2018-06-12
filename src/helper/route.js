
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const config = require('../config/defaultConfig');

const tplPath = path.join(__dirname,'../template/dir.tpl');
const source = fs.readFileSync(tplPath,'utf8');
const template = Handlebars.compile(source)

module.exports = async function(req,res,filePath){
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('Content-Type','text/plain');
      fs.createReadStream(filePath).pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type','text/html');
      console.info(config.root,filePath)
      const dir = path.relative(config.root,filePath)
      console.log(dir)
      const data = {
        title:path.basename(filePath),
        dir:dir ? `/${dir}` : '',
        files
      }
      res.end(template(data));
    }
  } catch (error) {
    console.log(error)
    res.statusCode = 404;
    res.setHeader('Content-Type','text/plain');
    res.end(`${filePath} is not a directory or file`);
  }
}