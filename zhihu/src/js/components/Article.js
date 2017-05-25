import React from 'react';

class Article extends React.Component {
    constructor (...args) {
        super(...args)
        
    }

    render () {
        return <div className="article">
            <div className="title">{this.props.title}</div>
            <div className="time">{this.props.last_reply_at}</div>
            <div className="content" dangerouslySetInnerHTML={{__html:this.props.content}}></div>
        </div>
    }
}

export default Article