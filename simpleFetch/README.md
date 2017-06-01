## react-router与react-redux跳转后保存store数据

### 1.router引入
```
import { Route, IndexRoute, Router, hashHistory, browserHistory } from 'react-router';
<Router routes={routes} history={browserHistory}/>
```

## 假设store结构如下,分别是主页home，详情页detail，评论页comment
```
{
    comment: {
        comments:[],
        leng:0
    }
    detail: {
        content: "xxx"
    }
    home: {
        loading: false,
        pos: 0,
        stories: []
    }
}

```

### 2.在主页home跳到详情页detail时，在主页实现获取详情页的请求数据，并赋予store，这样store就保留home，
```
//在home里面跳转是触发fetchDetailData
<Link to={ '/detail/'+item.id}  onClick={this.props.fetchDetailData.bind(this,item.id) }>

``` 
获取完详情数据后，这样store数据就成以下结构  

```
{
    comment: {
        comments:[]
        leng:0
    }
    detail: {
        content:"xxx"
    }
    home: {
        loading:false
        pos:29228
        stories:Array(201)
    }
}

```

### 3.在详情页detail跳到评论页comment时，在详情页detail实现获取评论页comment的请求数据，并赋予store，这样store就保留home，detail的数据了  

```
//在详情页detail里面跳转是触发fetchCommentData
<Link to={ '/comment/'+this.articleId}  onClick={this.props.fetchCommentData.bind(this, this.articleId) }>评论</Link>

```  

获取完评论数据后，这样store数据就成以下结构  
    

```
{
    comment: {
        comments:Array(20)
        leng:20
    }
    detail: {
        content:"xxx"
    }
    home: {
        loading:false
        pos:29228
        stories:Array(201)
    }
}

```  

### 4.这样，当要返回是时还原状态就可以从本地缓存的store里面取数据渲染。  

```
//在返回主页home时，在主页做判断，回到最初的最初点击跳转时的位置
componentDidMount () {
    if(this.props.stories.length === 0 ){
        this.props.fetchHomeData(this.s)
    }else{
        console.log(this.props.route.component.displayName)
        if(this.props.route.component.displayName == "Connect(Home)"){
            window.scrollTo(0,this.props.pos);
        }
        this.s()
    }
        
}
```