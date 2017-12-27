import React from 'react';
import ReactDOM from 'react-dom';

class Ch extends React.Component {
    constructor(...args) {
        super(...args)
    }
    render() {
        return <ul>
            {React.Children.map(this.props.children, item => item)}
        </ul>
    }
}

class Eh extends React.Component {
    constructor(...args) {
        super(...args)
    }
    render() {
        return <ul>
            {this.props.children}
        </ul>
    }
}

class App extends React.Component {
    x1 = '3'
    x2 = '4'
    constructor(...args) {
        super(...args)
        console.log(this.x1)
        console.log(this.x2)
        this.x1 = '1'
        this.x2 = <li>1</li>
        console.log(this.x1)
        console.log(this.x2)
    }
    render() {
        return <div>
          <p>测试</p>
          <ul>
            {this.x2}
          </ul>
          <Ch>
              <li>1</li>
              <li>2</li>
              <li>3</li>
          </Ch>
          <Eh>
              <li>11</li>
              <li>22</li>
              <li>33</li>
          </Eh>
        </div>
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)
