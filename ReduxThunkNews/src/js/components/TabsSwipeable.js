import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import ListContacts from './ListContacts';

export default class TabsSwipeable extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      slideIndex: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      slideIndex: value,
    });
  };
 
  render() {
    return (
      <div className='nav-tab'>
        <Tabs className='app-nav-tab'
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Tab One" value={0} />
          <Tab label="Tab Two" value={1} />
          <Tab label="Tab Three" value={2} />
        </Tabs>
        <SwipeableViews className='app-nav-list'
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div style = {{'padding':'-8px 0px -8px 0px'}}>
            <ListContacts fetchData={this.props.fetchData}/>
          </div>
          <div>
            <ListContacts fetchData={this.props.fetchData}/>
          </div>
          <div>
            <ListContacts fetchData={this.props.fetchData}/>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}