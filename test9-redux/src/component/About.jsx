import React, {Component} from 'react';
import {Link} from 'react-router';

/*
    redux 相关
*/
import { connect } from 'react-redux';
import action from '../action/index';

import Tool from '../lib/Tool/Tool';
import config from '../config/config';
import {Header, Footer, Loading} from './common/index';
import erweima from '../weibo@fengnovo.png';


class About extends Component {
    render() {
        return (
            <div>
                <Header leftIcon="fanhui" title="关于" />
                <div className="about">
                    <div className="saoma">
                        <div className="pictrue"><img src={erweima} /></div>
                    </div>
                    <div className="info">{config.indexTitle} {config.version}</div>
                    <div>github：<a href="https://github.com/fengnovo" target="_blank">@fengnovo</a></div>
                    <div>微博：<a href="http://weibo.com/u/1900251814" target="_blank">@fengnovo</a></div>
                </div>
            </div>
        );
    }
};


export default About;