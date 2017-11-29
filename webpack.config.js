const path=require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

var website ={
    publicPath:'http://192.168.199.106:1717/'
}
module.exports={
    entry:{
        entry:'./src/entry.js',
        entry2:'./src/entry2.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:website.publicPath
    },
    module:{
       rules:[
           {
               test:/\.css$/,
               use:extractTextPlugin.extract({
                   fallback:'style-loader',
                   use:[
                      {
                          loader:'css-loader',
                          options:{
                              importLoader:1
                          }
                      },{
                          loader:'postcss-loader'
                      }
                   ]
                   })
           },{
               test:/\.(png|jpg|gif)/,
               use:[{
                   loader:'url-loader',
                   options:{
                       limit:500,
                       outputPath:'images/'
                   }
               }]
           },{
               test:/\.(html|htm)$/i,
               use:['html-withimg-loader']
           }
       ]
    },
    plugins:[
        new uglify(),
        new htmlPlugin({
            minify:{
              removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new extractTextPlugin('css/index.css'),
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'192.168.199.106',         
        compress:true,                
        port:1717                    
    }
}