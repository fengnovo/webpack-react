import React, { Component } from 'react';
import { bindActionCreators,dispatch } from 'redux';
import { connect } from 'react-redux';

import { getTest } from './actions';

import Article from './components/Article'

//让组件关联state和action

class App extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    componentWillMount() {
        
    }

    render() {
        let dataArr = this.props.test && this.props.test.testData;
        // console.log(dataArr && dataArr.data)

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
    dispatch => bindActionCreators({getTest}, dispatch)
)(App)
