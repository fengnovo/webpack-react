import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            clickOne: 'aa1'
        }
    }
    render() {
        let that = this;
        return <div>
        <button onClick={() => this.setState({clickOne: 'aa3'})}>222</button>
        <div>
          {function() {
              return ['aa1','aa2','aa3'].map(item => {
                  return (
                      <div key={item} style={ {width:200, height:100, backgroundColor: '#ccc'} } onClick={()=>{
                          that.setState({clickOne: item});
                      }}>
                            <button style={Object.assign({},{ width:100, height:50 }, function(){
                                console.log(item);
                                if(item == that.state.clickOne) {
                                    return {backgroundColor: 'red'}
                                }
                            }())}>测试按钮{item}</button>
                      </div>
                  )
              })
          }()}
          </div>
        </div>
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)
