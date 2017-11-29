###  wenbpack 安装失败的原因

* 1、网络问题    cnpm
* 2、权限问题
* 3、node 版本问题

==============================================

### webpack版本问题修改

* 新项目
 >直接删除node_modules 重新安装 npm install --save-dev webpack
* 旧项目
 >修改package.json中的版本号   删除node_modules   重新  npm install

===============================================

### 学习步骤

* 1、配置文件webpack.config.js
* 2、entery选项（入口配置）
* 3、output选项（出口配置）
* 4、多入口、多出口配置

==================================================

### 基本结构

const path=require('path');
module.export={
    entry:{
        entry:'文件路径'
    },       入口配置
    output:{
        path：path.resolve(__dirname,'dist'),  node语法相对路径
        filename:'[name].js'    //压缩后的文件名
    },      出口配置
    module:{},      解读css  图片转换压缩
    plugins:[]      插件
    devServer:{}    配置服务
}


======================================================

###  webpack配置服务、热更新技术

devServer:{
    contentBase:path.resolve(__dirname,'dist'),
    host:'192.168.199.106',           //服务器地址
    compress:true,                    //服务器是否压缩
    port:1717                        //服务器端口
}

+ npm install webpack-dev-server --save-dev
+ 修改package.json
+ "script":{
    "server":"webpack-dev-server"
}
>起服务  npm run server

> webpack3.6以上的热更新

=========================================================

### css打包

* style-loader      //处理css中URL
* css-loader        //对标签处理


module:{
        rules:[
            {
                test:/\.css$/,    //通过正则的方式找到处理的扩展
                //use:['style-loader','css-loader]
                //loader
                //use:[{
                    loader:'style-loader'
                    },{
                        loader:'css-loader'
                }]
            }
        ]
    },

================================================================

### js打包

>引入插件 uglify

* const uglify = require('uglifyjs-webpack-plugin');

* plugins:[
   new uglify()
]

==================================================================

### html打包

+ 安装并引入插件  html-webpack-plugin
+ const htmlPlugin = require('html-webpack-plugin');
+ plugins:[
    new  htmlPlugin({
        minify:{
            removeAttributeQuotes:true
        },
        hash:true,
        template:'./src/index.html'
    })
]

+ minify：是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号。
+ hash：为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
+ template：是要打包的html模版路径和文件名称。

=====================================================================

### css图片路径问题

+ module:[{
    rules{
        test:/\.(png|jpg|gif)/,
        use:[{
            loader:'url-loader',
            options:{
                limit:50000
            }
        }]
    }
}] 

+ test:/\.(png|jpg|gif)/是匹配图片文件后缀名称。
+ use：是指定使用的loader和loader的配置参数。
+ limit：是把小于500000B的文件打成Base64的格式，写入JS。

===============================================================

###  css分离

+ 安装插件  extract-text-webpack-plugin
+ 引入插件
+ 在插件中声明
+ 修改处理css
+  rules:[
    {
        test:/\.css$/,
        use:extractTextPlugin.extract({
            fallback:'style-loader',
            use:'css-loader'
        })
    }]

===================================================================

### 处理html中的图片

+ 安装插件  html-withimg-loader
+ 配置插件  
>{
    test:/\.(html|htm)$/i,
    use:['html-withimg-loader']
}


====================================================================

### 自动补全css前缀

+ 安装插件  postcss-loader   autoprefixer

+ 创建postcss.config.js
>module.exports={
    plugins:[
        require('auotprefixer')
    ]
}

+ 编写loader
>{
    test: /\.css$/,
    use: extractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
        ]
    })
    
}