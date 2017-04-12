import React, { Component } from 'react';
import { bindActionCreators,dispatch } from 'redux';
import { connect } from 'react-redux';

/*actions*/
import { getTest,postTest } from './actions';

import Article from './components/Article'

//让组件关联state和action

class App extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    componentWillMount() {
        let params = {
            id: 23
        }
        // this.props.postTest(params) //发送post请求
        
        let id = '5433d5e4e737cbe96dcef312'
        // this.props.getTest(id) //发送get请求
    }

    render() {
        let dataArr = this.props.test && this.props.test.testData;
        console.log(dataArr && dataArr.data)

        return(
            <div >
                <button onClick={() => this.props.getTest('5433d5e4e737cbe96dcef312')}>请求数据</button><br/><br/>
                {
                    dataArr.length == 0 ? <div>点击发起请求</div> : <Article {...dataArr.data}/>
                }
            </div>
        );
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators({getTest,postTest}, dispatch)
)(App)
