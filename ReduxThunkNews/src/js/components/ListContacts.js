import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200, transparent} from 'material-ui/styles/colors';

const ListContacts = ({fetchData}) => (
    <List>
      {
        fetchData && fetchData.map((item) => <ListItem
          key={item.id}
          primaryText={item.title}
          leftIcon={<ActionGrade color={pinkA200} />}
          rightAvatar={<Avatar src={item.author.avatar_url} />}
        />)
      }

    </List>
    
);

export default ListContacts;