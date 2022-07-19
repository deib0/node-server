import * as http from 'http'
import * as fs from 'fs'
import * as p from 'path'
import * as url from 'url'
http.IncomingMessage
const server=http.createServer()
const publicDir=p.resolve(__dirname,'\public')// 拼接路径
server.on('request',(request,response)=>{// 自动匹配路径
    const {method,url:path,headers}=request
    if(method==='POST'){response.statusCode===405;response.end('不支持该类请求')}// 过滤POST
    let {pathname,search} =url.parse(path!)// 处理url，得到路径和查询参数分开
    if(pathname==='/'||!pathname){pathname='/index.html'}// 将/匹配为/index.html
    const extname =p.extname(pathname)// 文件扩展名
    response.setHeader('Cache-Control','public,max-age=666')// 设置缓存时间
    response.setHeader('Content-Type',`text/${extname.slice(1)};charset=utf-8`);
    fs.readFile(p.resolve(publicDir,pathname.slice(1)),(error,data)=>{
        if(error){// error是一个对象
            if(error.errno===-4058){
                response.statusCode=404
                response.end(`page is missing`)
                return
            }else{
                response.end('服务器繁忙，请稍后再试')
                return
            }
        }
        response.end(data.toString())// data是一个对象
    })
})

server.listen('8888')

