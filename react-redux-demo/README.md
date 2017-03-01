以上都是react结合redux的官方实例，取自官网或者我有修改  

1.每个项目下面可能有个 .babelrc文件被隐藏，请知悉    
.babelrc 
  
{
    "presets": ["react", "es2015", "stage-0", "stage-1"]  
}
  
2.需要webpack或者webpack-dev-server这两个npm包，如果没有在package.json内写有请添加  
版本因为不是用webpack2,所以要对应1.几的    
"dependencies": {  
    "webpack": "^1.12.13",  
    "webpack-dev-server": "^1.11.0"  
  },  

3.个别项目需要react-scripts的全局npm包，如要运行需安装  

  

todos是慕课网课程 http://www.imooc.com/learn/744 的视频