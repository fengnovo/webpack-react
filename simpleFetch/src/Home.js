import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchHomeData, fetchNextData, fetchingNextData } from './actions'

let date =  20170530

class Home extends React.Component {
    constructor (props) {
        super(props)
        this.s = this.s.bind(this)
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
         this.props.fetchHomeData(this.s)
    }
    render () {
        return (
            <ul>
                {this.props.stories.map((item,i) => (<li key={i}><a href={'/detail/'+item.id}>
                    <img src="https://pic2.zhimg.com/v2-f58195f92182582e6acf68a152e01201.jpg" alt="" />
                    {item.title}</a></li>) )}
                
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    stories: state.home.stories,
    loading: state.home.loading
})

const mapDispatchToProps = dispatch => ({
    fetchHomeData:(cb) => dispatch(fetchHomeData(cb)),
    fetchNextData:(date) => dispatch(fetchNextData(date)),
    fetchingNextData:(loading) => dispatch(fetchingNextData(loading)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)