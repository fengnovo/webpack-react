import React, { Component } from 'react';
import { bindActionCreators,dispatch } from 'redux';
import { connect } from 'react-redux';


import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';

import BottomNavigations from './components/BottomNavigations';
import TabsSwipeable from './components/TabsSwipeable';
import Lists from './components/Lists';



import { GETDATA } from './actions';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


class App extends Component {
  constructor(props, context) {
    super(props, context);
    console.log(this.props);

    this.handleHide = this.handleHide.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this)

    this.state = {
        openDrawer: false
    };
  }


  componentDidMount () {
    this.props.GETDATA();
  }
  

  handleHide () {
    this.setState({
        openDrawer: false
    })
  }

  toggleDrawer () {
    console.log('触发toggleDrawer');
    this.setState({
        openDrawer: !this.state.openDrawer
    })
  }

/*{   
    DATA: {fetchData: []},
    SELECT: ''
}*/

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
                <AppBar className='app-nav-bar'
                    title='CNODE' 
                    onLeftIconButtonTouchTap={this.toggleDrawer} 
                    onRightIconButtonTouchTap={this.handleHide}
                    onTitleTouchTap={this.handleHide}
                  />
                <div className=''>
                      <Drawer toggleDrawer={this.toggleDrawer}
                            docked={this.state.openDrawer}
                            onRequestChange={this.handleHide}
                        > <Lists />
                        </Drawer>
                      <TabsSwipeable fetchData={this.props.DATA.fetchData}/>
                </div>
                <BottomNavigations />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(
    state => state,
    dispatch => bindActionCreators({GETDATA}, dispatch)
)(App)
