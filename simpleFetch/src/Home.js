import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { fetchHomeData, fetchNextData, fetchingNextData,fetchDetailData, markScrollY } from './actions'

let date =  20170530

class Home extends React.Component {
    constructor (props) {
        super(props)
        this.s = this.s.bind(this)
        this.handleClick  = this.handleClick.bind(this)
    }

    s(){
        window.onscroll = () => {  
            var htmlHeight=document.body.scrollHeight||document.documentElement.scrollHeight;  
            var clientHeight=document.body.clientHeight||document.documentElement.clientHeight;  
            var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;  
            if(scrollTop+clientHeight==htmlHeight && !this.props.loading){  
                console.log('3')
                this.props.fetchingNextData(true)
                this.props.fetchNextData(date--)
            }  
        }  
    }

    componentDidMount () {
        if(this.props.stories.length === 0 ){
            this.props.fetchHomeData(this.s)
        }else{
            // setTimeout(()=>{
                console.log(this.props.route.component.displayName)
                if(this.props.route.component.displayName == "Connect(Home)"){
                    window.scrollTo(0,this.props.pos);
                }
                this.s()
            // },300)
        }
         
    }

    handleClick (id){
        this.props.fetchDetailData(id)
    }

    componentWillUnmount (){
        this.props.markScrollY(window.pageYOffset);
        window.onscroll = null;
    }

    render () {
        return (
            <ul>
                {this.props.stories.map((item,i) => (
                    <li key={i}>
                    <Link to={ '/detail/'+item.id}  onClick={this.handleClick.bind(this,item.id) }>
                    <img src="https://pic2.zhimg.com/v2-f58195f92182582e6acf68a152e01201.jpg" alt="" />
                    {item.title}
                     </Link>
                    </li>) )}
                
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    stories: state.home.stories,
    loading: state.home.loading,
    pos:state.home.pos,
})

const mapDispatchToProps = dispatch => ({
    fetchHomeData:(cb) => dispatch(fetchHomeData(cb)),
    fetchNextData:(date) => dispatch(fetchNextData(date)),
    fetchingNextData:(loading) => dispatch(fetchingNextData(loading)),
    fetchDetailData:(articleId) => dispatch(fetchDetailData(articleId)),
    markScrollY:(pos) => dispatch(markScrollY(pos)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)