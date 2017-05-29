import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '1',
            show: true
        }
    }

  //componentDidMount
    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                text: 'Hello World!'
            })

            setTimeout(()=>{
                this.setState({
                    show: false
                })
            },3000);
        },3000);
        
    }


    render() {
        return this.state.show ? <Detail text={this.state.text}/> : null
    }

}
class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps');
    }

    shouldComponentUpdate(newProps, newState){
        console.log('shouldComponentUpdate');
        return true
    }

    componentWillUpdate(){
        console.log('componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }



    render() {
        return <div>{this.props.text}</div>
    }

}

ReactDom.render(
    <App />,
    document.getElementById('app')
)