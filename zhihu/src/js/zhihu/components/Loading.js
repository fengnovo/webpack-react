import React, { Component } from 'react'

class Loading extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="preloader-wrapper small active" id="loading">
                <div className="spinner-layer spinner-green-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loading