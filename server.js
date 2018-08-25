const http = require('http');
const fs = require('fs');
const urlLib = require('url');
const querystring = require('querystring');
const users = {};
var server = http.createServer(function(req, res) {
    var obj = urlLib.parse(req.url, true);
    const file_name = './web' + req.url;
    const url = obj.pathname;
    const get = obj.query;
    if (url == '/user') {
        switch (get.act) {
            case 'reg':
            // 检查用户名是否存在
            if (users[get.user])  {
                res.write('{"ok": false, "msg":"该用户名已存在"}');
            } else {
                // 插入数据
                users[get.user] = get.pswd;
                res.write('{"ok": true, "msg":"注册成功"}');
            }
            break;
            case 'login':
            if (users[get.user] == null) {
                res.write('{"ok": false, "msg":"此用户不存在"}');
            } else if (users[get.user] != get.pswd) {
                res.write('{"ok": false, "msg":"用户名或密码有误", "pswd": ' + users[get.user] +'}');
            } else {
                res.write('{"ok": true, "msg":"登录成功"}');
            }
            break;
            default:
            res.write('{"ok": false, "msg": "位置的act"}')
        }
        console.log(users)
        res.end();
    } else {
        fs.readFile(file_name, (err, data) => {
            if (err) {
                res.write('您发访问的页面不存在');
            } else {
                res.write(data)
            }
            res.end();
        });
    }
});
server.listen(8081)