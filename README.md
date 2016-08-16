# myblog
单页面个人博客应用，开放自己博客的源码，需要用的可以搭建在自己服务器上，会持续维护。

采用了`node`与`express`搭建后台服务器，开发环境下前台页面`webpack`全自动打包热替换，前台页面用`react`和`flux`搭建。

配备了邮件通知系统和后台管理系统。
* 当用户的评论被回复时，用户将会收到邮件提醒。
* 当有用户在你的网站上留言时，你将会收到邮件提醒。
* 当你发布新博文时，订阅用户会收到邮件提醒。
* 后台管理系统可以管理站点内容

## 安装

克隆仓库

```
https://github.com/gisonyeung/myblog.git
```

安装依赖项，中间需要安装一个`node-sass`模块，是需要翻墙安装，国内推荐使用`cnpm`进行安装，优势很明显，所有依赖项都能装的比较快。

```
$ npm install
```

or

```
$ npm install cnpm -g
$ cnpm install
```

## 配置博客证书
安装完依赖项以后，就需要我们手动新建一个文件`/server/credentials.js`，这个文件是私人证书文件，用于存储权限验证信息还有邮件发送用的账户，格式如下：
```
module.exports = {
    cookieSecret: 'someString', // cookie密钥，随便设点什么字符串就行
    mail: {
        user: 'xxx@163.com', // 这里填的是邮箱名，确保开了SMTP服务
        password: 'xxx', // 邮箱密码
        string: 'smtps://username%40163.com:password@smtp.163.com', // username%40xx.com => yangzicong2008%40163.com 这相当于username，只是把@转义为%40
    },
    mongo: {
        development: 'mongodb://localhost:27017/blog', // 这里是数据库链接，确保运行了mongodb服务
        production: 'mongodb://localhost:27017/blog', // 这里是数据库链接
        session: 'mongodb://localhost:27017/session' // 这里是session数据库链接
    },
    admin: { // 这是后台管理系统登陆时的帐号密码
        username: 'admin', 
        password: '123456', 
    }
};
```

## 启动

博客需要用到`mongoDB`数据库，所以需要先安装`mongoDB`，如何安装请自行搜索。

下面我们先启动`mongoDB`服务

```
$ mongod --dbpath D:/mongodb // 最后这个是数据存储路径，找个文件夹存放即可
```

开启数据库后，运行`start`命令，即可进入到开发模式。

```
$ npm start
```

默认监听8000端口，需要修改的可以到`/server/server.js`文件的头部自行修改。

当你看到这句话`The server is running on http://localhost:8000/`，就说明，`node`已经启动成功了。然后`webpack`就会开始打包依赖项，开机第一次打包会比较久，依赖项也比较大，耐心等耐几十秒即可。

看到控制台输出类似的这句话

```
webpack built 8512e933aef48bc68bf1 in 33662ms
```

就说明文件已经成功打包，至此，博客已经可以成功运行了。访问连接如下

```
http://localhost:8000/
```

如果`webpack`启动失败，请确保已经全局安装过`webpack`

```
$ npm install webpack -g
```

管理页面访问路径
```
http://localhost:8000/admin/login
```



## 修改个人面板信息
如须修改个人面板的信息，找到`/src/components/SelfInfoBar.jsx`，修改对应信息即可。

## 修改关于页信息
如须修改关于页的信息，找到`/src/components/AboutPanel.jsx`

# 上线

## 部署多线程
服务器在开发环境下默认开启单线程，如需上线开启多线程模式，可以在`/server/server.js`底部取消相应代码的注释

## 取消`webpack hmr`
在`/server/server.js`注释掉`webpack`相关代码，并注释`/webpack.config.js`中与热替换有关的代码，即可取消`webpack hmr`（上线环境下不取消会导致频繁请求）

