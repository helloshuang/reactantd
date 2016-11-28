import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ActionStatus from '../../constants/ActionStatus'
import { History } from 'react-router';

import * as logactions from '../../redux/modules/user'
import {
  Row,
  Col,
  Modal,
  Button,
  Menu,
  Icon,
  Tabs,
  // Tree,
} from 'antd';

export default class Test extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    console.log('ok')
    return(
      <div>
        <Button>123</Button>
      </div>
    )
  }
}
