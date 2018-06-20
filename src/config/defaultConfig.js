module.exports = {
  root:process.cwd(),
  hostname:'127.0.0.1',
  port:9527,
  compress:/\.(html|js|css|md)/,//压缩支持的文件类型
  cache:{
    maxAge:600,
    expires:true,
    cacheControl:true,
    lastModified:true,
    etag:true
  }
}
